# [1.3.0](https://github.com/guilherhenri/todo-hooks/compare/v1.2.0...v1.3.0) (2025-06-20)


### Bug Fixes

* **local-storage:** add error handling for invalid JSON parsing ([a762355](https://github.com/guilherhenri/todo-hooks/commit/a7623553f5b6c17783056bb588775bc597cc266e))


### Features

* **create-form:** enhance accessibility for task creation form ([ff823e1](https://github.com/guilherhenri/todo-hooks/commit/ff823e13742aff44f316200deac34a99b9004a57))
* **edit-form:** enhance accessibility for task editing form ([c9de7fc](https://github.com/guilherhenri/todo-hooks/commit/c9de7fcdb79050d875473e0f2f9de4cc2a5265a2))
* **filters:** enhance accessibility for Filters component ([4b808f5](https://github.com/guilherhenri/todo-hooks/commit/4b808f572823102dcf101c74bfa9f000b0a24b27))
* **header:** enhance accessibility for task header ([94cb48c](https://github.com/guilherhenri/todo-hooks/commit/94cb48c644e1acae11f607761b8548a2f43236dc))
* **list-tasks:** enhance accessibility for task list ([c24a7ed](https://github.com/guilherhenri/todo-hooks/commit/c24a7ed79bcf229eb4c2ebd6b02e130e4c45f5d1))
* **task-card:** enhance accessibility and refine checkbox variant ([be52892](https://github.com/guilherhenri/todo-hooks/commit/be52892587806818c4f3a8449b4aaa1e0cf253ed))
* **tests:** create TaskContext mock utilities ([b151050](https://github.com/guilherhenri/todo-hooks/commit/b151050e2b60ed688adbe3ca0d9857d70dd940dc))

# [1.2.0](https://github.com/guilherhenri/todo-hooks/compare/v1.1.0...v1.2.0) (2025-06-19)


### Features

* **header:** integrate Filters component into header ([366f70e](https://github.com/guilherhenri/todo-hooks/commit/366f70e93e79656b5dac3cdc01ed8663d6fe7e4f))
* **task:** implement Filters component ([f3b2a9e](https://github.com/guilherhenri/todo-hooks/commit/f3b2a9efa3e9acb83debf63ee02ab2e69888f112))

# [1.1.0](https://github.com/guilherhenri/todo-hooks/compare/v1.0.0...v1.1.0) (2025-06-19)


### Features

* **app:** integrate TaskProvider into App.tsx ([9531f49](https://github.com/guilherhenri/todo-hooks/commit/9531f495bbb63d0ed624c9d3fb57eb1332e56262))
* **context:** create TaskContext for global state management ([6af70fa](https://github.com/guilherhenri/todo-hooks/commit/6af70fabbe8c2f0bc4cfeea2f7992836f926c706))
* **header:** display dynamic task statistics from context ([ebc00c6](https://github.com/guilherhenri/todo-hooks/commit/ebc00c6683058b594fa52e7d9b7acd8f863b9e01))
* **hook:** implement useLocalStorage custom hook ([1419689](https://github.com/guilherhenri/todo-hooks/commit/14196898f8b18afeac17816a6f8ac9286459dc8f))
* **list-tasks:** render dynamic task list from context ([bce9ab9](https://github.com/guilherhenri/todo-hooks/commit/bce9ab9308ad767ecf4d54be3fddf11244d2f9cd))
* **task-card:** implement task update and delete via context ([7958d90](https://github.com/guilherhenri/todo-hooks/commit/7958d90e447e94300f3616737024b86708500901))
* **task-card:** integrate EditForm into TaskCard via Dialog ([779d579](https://github.com/guilherhenri/todo-hooks/commit/779d5799ea177cf09136ac6262db34ebf7566a94))
* **task-context:** add getTask function to context ([8e3ccc4](https://github.com/guilherhenri/todo-hooks/commit/8e3ccc4df536eb5486ae870bffcf66975724ea3f))
* **task:** implement EditForm component ([7748fc8](https://github.com/guilherhenri/todo-hooks/commit/7748fc8ee3cb1c5fd76ec52953441c5902842aef))
* **ui:** implement Radix UI Dialog component ([db53b44](https://github.com/guilherhenri/todo-hooks/commit/db53b44eb11b50154038eabc4d115d4e2203635c))


### Performance Improvements

* **create-form:** optimize form validation with useMemo ([0f55e3e](https://github.com/guilherhenri/todo-hooks/commit/0f55e3e0951ca0683674926e2095de4a0b416889))

# 1.0.0 (2025-06-18)


### Features

* **app:** integrate CreateForm into App.tsx ([7fd4bc2](https://github.com/guilherhenri/todo-hooks/commit/7fd4bc2925a42f7ab37bed5cd70780e08bf1f1b9))
* **app:** integrate Header component into App.tsx ([204cf62](https://github.com/guilherhenri/todo-hooks/commit/204cf6296d04f24adf9c6774df580b6a521802af))
* **app:** integrate ListTasks component into App.tsx ([c84fc7c](https://github.com/guilherhenri/todo-hooks/commit/c84fc7c84053ce01fb0fde15b8c20b7b8a9ecda4))
* **layout:** add content layout wrapper to App.tsx ([37db874](https://github.com/guilherhenri/todo-hooks/commit/37db874aec7534216311db6cb27f8f17dd2781bc))
* **layout:** create Header component for task statistics ([2626dcd](https://github.com/guilherhenri/todo-hooks/commit/2626dcd0a9126a1848940c58c7ce63417b2ddc89))
* **layout:** implement Banner component ([193ae78](https://github.com/guilherhenri/todo-hooks/commit/193ae78d1e231e14053ac8823851e328be48343d))
* **task:** create TaskCard component ([673b7ae](https://github.com/guilherhenri/todo-hooks/commit/673b7ae3b5f4df87b1e52757e6f961ff080e0549))
* **task:** implement CreateForm component ([dc80aa4](https://github.com/guilherhenri/todo-hooks/commit/dc80aa419e652e79bdcaccc25b47445c22f805a6))
* **task:** implement ListTasks component ([1cf05a3](https://github.com/guilherhenri/todo-hooks/commit/1cf05a3ebeead5bf0f92a2fb9ba046fb1a98473d))
* **ui:** implement Radix UI Select component ([ff03551](https://github.com/guilherhenri/todo-hooks/commit/ff03551a3c4616b3f85ebba011741f74157a6483))
