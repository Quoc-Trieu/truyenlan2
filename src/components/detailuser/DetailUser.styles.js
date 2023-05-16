import tw from "tailwind-styled-components";

export const Detail = tw.div`
    h-screen
    overflow-y-auto
`
Detail.Header = tw.div`
    h-header
    flex
    gap-[23px]
    justify-start
    items-center
    bg-[#fff]
    p-[20px]
    text-[26px]
    text-[#000650]
    font-[600]
`
Detail.btnLeft = tw.div`
    w-[65px]
    h-[50px]
    px-[16px]
    py-[15px]
    rounded-[5px]
    bg-[#93B2EC]
    cursor-pointer
`
Detail.body = tw.div`
    w-full
    h-[calc(100vh-theme(spacing.header))]
    bg-[#F0F4FF]
    p-[20px]
    flex
    gap-[30px]
    overflow-hidden
`
Detail.leftPage = tw.div`
    flex-[6.5]
    h-full
    flex
    flex-col
`
Detail.detailImg = tw.div`
    flex
    gap-[30px]
    w-full
`
Detail.boximg = tw.div`
    flex
    flex-col
    gap-[10px]
    w-2/6
`
Detail.boximgTitle = tw.span`
    text-[#000650]
    font-[500]
`
Detail.wrapperImg = tw.div`
    border-[5px]
    border-solid
    border-[#fff]
    rounded-[3px]
    w-full
    h-[150px]
    max-h-full
`
Detail.Img = tw.img`
    w-full
    h-full
`
Detail.historyTran = tw.div`
    pt-[30px]
    flex-[1]
`
Detail.historyhead = tw.div`
    pb-[20px]
    flex
    flex-col
    gap-[15px]
`
Detail.historyheadTitle = tw.div`
    text-[#000650]
    text-[19px]
    font-[500]
`
Detail.Table = tw.table`
    w-full
`
Detail.TrHead = tw.tr`
    border-b-[1px]
    border-[#ccc]
    border-solid
`
Detail.Tr = tw.tr`
`
Detail.Th = tw.th`
    text-[#000]
    text-[18px]
    font-[400]
    py-[15px]
    text-start
`
Detail.Td = tw.td`
    text-[#161B52]
    h-[55px]
`
Detail.paging = tw.div`
    flex
    w-full
    justify-center
    items-center
    mt-[20px]
`
Detail.Boxai = tw.button`
    w-[45px]
    h-[45px]
    flex
    justify-center
    items-center
    bg-[#fff]
    rounded-[3px]
    text-[20px]
    cursor-pointer
`
Detail.Number = tw.div`
    mx-[10px]
    text-[18px]
    text-[#000650]
    font-bold
`

Detail.rightPage = tw.div`
    flex-[3.5]
    flex
    h-full
    flex-col
    gap-[15px]
`
Detail.rightPageTop = tw.div`
    flex-[3]
    bg-[#fff]
    rounded-[5px]
    p-[15px]
    flex
    flex-col
    gap-[10px]
`
Detail.spanInfo = tw.span`
    font-[500]
    text-[#000650]
`
Detail.spanInfoValue = tw.span`
    text-[#000650]
`
Detail.rightPageTopTitle = tw.span`
    text-[#000650]
    text-[18px]
    font-[500]
`
Detail.rightPageBtom = tw.div`
    flex-[7]
    bg-[#fff]
    rounded-[5px]
    p-[15px]
`
Detail.boxMoney = tw.div`
    flex
    justify-between
    bg-[#000650]
    rounded-[5px]
    text-[#fff]
    p-[10px]
`
Detail.boxMoneyLeft = tw.div`
    flex
    gap-[10px]
    items-center
`
Detail.boxMoneyLeftImg = tw.img`
    w-[50px]
`
Detail.boxMoneyLeftValue = tw.div`
    flex
    flex-col
`
Detail.boxMoneyRight = tw.div`
    flex
    flex-col
    gap-[15px]
`
Detail.boxMoneyRightBtn = tw.button`
    w-[140px]
    py-[10px]
    font-bold
    rounded-[3px]
`
Detail.history = tw.div`
    py-[15px]
    h-[50%]
    overflow-y-auto
`
Detail.historyTitle = tw.div`
    text-[18px]
    font-[500]
    text-[#000650]
    pb-[10px]
    relative
    after:content-['']
    after:w-full
    after:h-[1px]
    after:bg-[#707070]
    after:absolute
    after:bottom-[0]
    after:left-[0]
`
Detail.historyList = tw.div`
    pt-[15px]
    flex
    flex-col
    gap-[10px]
`
Detail.historyItem = tw.div`
    flex
    w-full
    justify-between
`

export const Form = tw.form`
    mt-[29px]
    w-full
    flex
    flex-col
    gap-[40px]

    max-md:gap-[20px]
`
Form.Title = tw.h1`
    w-full
    text-center
    text-[27px]
    font-[500]
`
Form.BoxItem = tw.div`
    flex
    gap-[19px]
    w-full

    max-md:flex-col
`
Form.Item = tw.div`
    flex
    flex-col
    gap-[9px]
    w-full
`
Form.Span = tw.span`
    text-[17px]
`
Form.Input = tw.input`
    outline-[#000]
    outline-[1px]
    w-full
    border-[1px]
    border-solid
    border-[#B7B7B7]
    rounded-[3px]
    py-[10px]
    px-[20px]
`
Form.BoxBtn = tw.div`
    w-full
    flex
    gap-[40px]
    justify-center
    items-center
`
Form.CancleBtn = tw.button`
    w-[180px]
    py-[14px]
    rounded-[3px]
    bg-[#A1A1A1]
    font-[500]
    text-[17px]
    text-[#fff]
`
Form.SubmitBtn = tw.button`
    w-[180px]
    py-[14px]
    rounded-[3px]
    bg-[#0082D9]
    font-[500]
    text-[17px]
    text-[#fff]
`