const ControlerPostObject = require('../routers/post/Model');

const mockApiData = {"Timestamp":"14/03/2023 02:41:15","Company Name 公司名稱":"幣安","Company Website 公司網站":"binance.com","About Company 公司簡介":"Binance 是一家全球區塊鏈公司，擁有世界上交易量和用戶最多的數字資產交易所，肩負著加速加密貨幣採用和提高貨幣自由度的更大使命。\n\n您是否希望成為區塊鏈行業最具影響力的公司的一員，並為正在改變世界的加密貨幣革命做出貢獻？","Job Title 職位名稱":"業務發展（KOL 和合作夥伴）"," Job Description 工作內容":"在幣安工作\n• 做有意義的事；做金融科技未來的一份子，做行業第一\n• 快速發展、具有挑戰性和獨特的業務問題\n• 國際工作環境和扁平組織\n• 在一家成長中的公司中獲得巨大的職業發展機會\n• 在職業生涯中期搬遷和國際調動的可能性\n• 有競爭力的薪資\n• 彈性工作時間，休閒著裝","Responsibilities and Duties 職位要求":"職責：\n積極接觸 YouTube 主播、媒體、影響者，並為幣安發展合作夥伴關係，參與業務發展活動以支持業務增長。\n管理賬戶並與 KOL 一起為 Binance Feed 創建和執行內容；分析他們的表現並就如何改進提出建議。\n與當地社區聯繫並監控行業/競爭對手趨勢，以優化產品、營銷和運營策略。\n探索與公司發展相一致的新商業理念和戰略舉措。\n\n要求：\n我們正在尋找在 web3 社區中擁有強大網絡的個人，尤其是與 web3 內容創建者。\n具有專注於合作夥伴關係和收購的業務開發、銷售或營銷角色的經驗。\n在達到和超過銷售和收入目標方面的良好記錄。\n一個足智多謀的自我啟動者和頑強的問題解決者，願意捲起袖子滿足客戶需求並改善客戶體驗。\n注重細節、注重結果的個人，可以在最少的監督下工作。","How to Apply 申請方式":"https://jobs.lever.co/binance/8d52bfb2-d54e-4f5c-a19b-dcbe1b1693aa/apply","Contact 聯絡方式":"binance@gmail.com","Salary 薪金待遇":"未知","Category 分類":"Business Development","Remote 是否遠程":"No 辨公室上班","Full Time 是否全職":"Yes 全職","Location 工作地點":"Hong Kong","id":"1230024115"}
const mockPosttype = 'foo'

test("Post Controler, property match", async (done) => {
  const postObj = new ControlerPostObject(mockPosttype,mockApiData)

  // id property
  expect(postObj.id).toBe(mockApiData.id)

  // date property
  expect(postObj.date.getYear()).toBe(2023-1900)
  expect(postObj.date.getMonth()).toBe(2) //march
  expect(postObj.date.getDate()).toBe(14) //14th

  // data property
  expect(postObj.title).toBe(mockApiData["Job Title 職位名稱"])
  expect(postObj.excerpt).toBe(mockApiData["Job Description 工作內容"])
  expect(postObj.categories).toBe(mockApiData["Category 分類"])
  expect(postObj.uri).toBe(`/${mockPosttype}/${mockApiData.id}`)

  done()
});
