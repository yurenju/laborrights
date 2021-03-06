#language: zh-TW

功能: 工作時間

  場景: 工作時間選擇星期幾的地方應該標明休息日
    當使用者進入網站
    並且點選 "編輯基本資料" 連結
    並且點選 "更多選項" 連結
    並且將 "休息日" 改為 "星期三"
    並且點選 "儲存" 連結
    那麼點選 "工作時間" 連結
    而且選擇日期的下拉式選單中 "星期三" 應該被標示為 "休息日"

  場景: 工作時間選擇星期幾的地方應該標明例假日
    當使用者進入網站
    並且點選 "編輯基本資料" 連結
    並且點選 "更多選項" 連結
    並且將 "例假日" 改為 "星期四"
    而且點選 "儲存" 連結
    那麼點選 "工作時間" 連結
    而且選擇日期的下拉式選單中 "星期四" 應該被標示為 "例假日"

  場景: 例假日工作應該要顯示需要補修
    當使用者進入網站
    並且點選 "工作時間" 連結
    並且將 "日期" 改為 "星期日"
    並且點選 "更多選項" 連結
    而且點選當天是否有天災、事變或突發事件
    那麼結果應該顯示需要補修
