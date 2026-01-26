# 试题库系统数据库模式参考手册 (AI-Ready Schema Documentation)

## 1. 架构核心说明
本数据库专为**交互式试题库**设计。核心逻辑采用“递归树结构”处理复合型题目，并使用 `JSONB` 字段存储交互元数据和统计指标。

- **逻辑层级**：`Alliance (联盟)` -> `Exam (考试)` -> `Exam_Subject (科目)` -> `Paper_Items (组卷关联)` -> `Questions (题目池)`.
- **嵌套机制**：`questions` 表通过 `parent_id` 字段实现无限级嵌套，支撑“材料 -> 题组 -> 小题 -> 子问”结构。
- **媒体解耦**：媒体资源独立存储，题目通过 `media_anchor` 毫秒级偏移量引用长媒体片段。

---

## 2. 实体关系详细定义

### 2.1 组织与地域 (alliances, schools)
| 字段名 | 类型 | 说明 | AI 操作提示 |
| :--- | :--- | :--- | :--- |
| `alliances.regions` | JSONB | 国家与省份多选 | 格式：`[{"country": "CN", "provinces": ["BJ", "SH"]}]` |
| `alliances.edu_stages` | JSONB | 覆盖学段 | 示例：`["小学", "初中"]` |
| `schools.region_info` | JSONB | 精确地域归属 | 示例：`{"country": "CN", "prov": "GD", "city": "SZ"}` |

### 2.2 考试与科目 (exams, exam_subjects)
| 字段名 | 类型 | 说明 | AI 操作提示 |
| :--- | :--- | :--- | :--- |
| `exams.exam_settings` | JSONB | 考试规则配置 | 如防作弊开关、题目随机化等参数 |
| `exam_subjects.score_stats` | JSONB | 成绩统计快照 | 存储最高分、平均分、各批次分数线 (Score Lines) |

### 2.3 核心题目池 (questions)
| 字段名 | 类型 | 说明 | AI 操作提示 |
| :--- | :--- | :--- | :--- |
| `parent_id` | BIGINT | 指向父级题目 | `NULL` 表示该题目是顶级材料或独立题目 |
| `q_category` | ENUM | 节点属性 | `CONTAINER` 为逻辑容器(材料)；`LEAF` 为实际答题项 |
| `q_type` | STRING | 交互组件类型 | 用于前端决定渲染 `choice`, `fill_in`, `audio_detect` 等 |
| `content_json` | JSONB | 结构化题干 | 支持 HTML、LaTeX 及填空占位符 `[[slot_1]]` |
| `options_json` | JSONB | 交互配置 | 存储选择题选项数组或填空题的 Slot 定义 |
| `media_anchor` | JSONB | 媒体片段定位 | 格式：`{"start_ms": 15000, "end_ms": 45000}` (毫秒级) |

### 2.4 答案与解析 (question_solutions)
| 字段名 | 类型 | 说明 | AI 操作提示 |
| :--- | :--- | :--- | :--- |
| `answer_data` | JSONB | 结构化答案 | 多选存数组 `["A", "B"]`，填空存多版本 `["北京", "Beijing"]` |
| `scoring_logic` | JSONB | 自动化评分脚本 | 存储权重分布、容错规则、踩点给分逻辑 |

---

## 3. 典型场景处理协议

### 3.1 听力材料题操作逻辑
1. **顶级节点 (`CONTAINER`)**: `media_id` 指向原始 30 分钟音频。
2. **中间节点 (`CONTAINER`)**: 如“听下面一段对话，回答1-3题”。
3. **叶子节点 (`LEAF`)**: 具体题目。设置 `media_anchor` 为音频中的特定时间区间（如 `180000ms` 至 `240000ms`）。
   - **AI 指令**: 前端播放器通过父级 `media_id` 加载音频，并根据当前 `LEAF` 题目的 `media_anchor` 执行 `seek()` 跳转。

### 3.2 填空题交互逻辑
- **题干**: `"1+1=[[slot_1]]，2+2=[[slot_2]]"`。
- **配置 (`options_json`)**: 
  ```json
  {"slot_1": {"type": "number"}, "slot_2": {"type": "number"}}
  ```
* **答案 (`answer_data`)**:
```json
{"slot_1": "2", "slot_2": "4"}
```



### 3.3 组卷逻辑 (`paper_items`)

* 组卷表**仅引用** `parent_id IS NULL` 的顶级题目 ID。
* AI 检索试卷时，应使用**递归查询 (Recursive CTE)** 从顶级 ID 向下抓取所有子节点，以重构题目树。

---

## 4. 性能与检索建议

* **知识点检索**: 对 `questions.tags` 字段使用 `GIN` 索引，支持高效的 JSON 包含查询。
* **地域过滤**: 使用 `alliances.regions @> '[{"country": "CN"}]'` 进行跨国家筛选。
* **版本控制**: 通过 `question_solutions.version_tag` 管理不同时期的标准答案。
