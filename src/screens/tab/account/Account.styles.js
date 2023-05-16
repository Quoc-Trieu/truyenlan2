import tw from 'tailwind-styled-components';

export const Accounts = tw.div`
    w-full
    h-full
    bg-background

    max-md:px-[0]
`
Accounts.Header = tw.div`
    h-header
    flex
    justify-start
    items-center
    bg-[#fff]
    p-[20px]
    text-[26px]
    text-[#000650]
    font-[600]
`
Accounts.Body = tw.form`
    w-full
    h-[calc(100%-theme(spacing.header))]
    bg-[#F0F4FF]
    p-[20px]
`
Accounts.Bodybg = tw.div`
    bg-bgac
    bg-cover
    w-full
    h-[200px]
    rounded-[10px]
    relative

    max-md:bg-center
`
Accounts.Boxavt = tw.div`
    absolute 
    top-[50%]
    left-[1.5%]
    border-[10px]
    border-[rgba(35,255,73,0.5)]
    border-solid
    rounded-[50%]
    w-fit
    h-fit

    max-md:left-[50%]
    max-md:translate-x-[-50%]
`
Accounts.avt = tw.img`
    w-[170px]
    h-[170px]

    max-md:w-[150px]
    max-md:h-[150px]
`
Accounts.Boxcam = tw.div`
    absolute
    bottom-[3px]
    right-[-4px]
    px-[15px]
    py-[19px]
    bg-[#20244C]
    rounded-[50%]
    border-[1px]
    border-solid
    border-[#fff]
    cursor-pointer

    max-md:px-[12px]
    max-md:py-[16px]
`
Accounts.Cam = tw.img`
    w-[30px]
    h-[22px]

    max-md:w-[25px]
    max-md:h-[17px]
`
Accounts.Boxdetail = tw.div`
    mt-[130px]
    pl-[25px]

    max-md:pl-0
`
Accounts.ItemInfo = tw.div`
    text-[15px]
    pb-[15px]
    pt-[30px]
    text-[#707070]
    border-solid
    border-[#AAAAAA]
    border-b-[1px]
    flex
    w-fit
`
Accounts.ItemSpan = tw.div`
    w-[100px]
    whitespace-nowrap
`
Accounts.ItemInput = tw.input`
    ml-[100px]
    outline-none
    text-[#000]
    font-[500]
    text-[17px]
    bg-transparent
    w-[400px]
`
Accounts.Button = tw.button`
    ml-[25px]
    w-[220px]
    py-[12px]
    bg-[#24CF41]
    text-[#fff]
    font-[500]
    rounded-[3px]
    mt-[20px]

    max-md:mt-[40px]
    max-md:ml-0
    max-md:self-center
`