import tw from 'tailwind-styled-components';

export const DepositManagers = tw.div`

`
DepositManagers.Header = tw.div`
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
DepositManagers.Body = tw.div`
    w-full
    h-[calc(100vh-theme(spacing.header))]
    bg-[#fff]
    p-[20px]
    flex
    justify-center
    gap-[30px]
`
DepositManagers.Left = tw.form`
    flex
    flex-col
    rounded-[7px]
    bg-[#F0F4FF]
    w-[40%]
    h-fit
    overflow-hidden
`
DepositManagers.Right = tw.div`
    flex-[7]
`
DepositManagers.HeaderBoxinput = tw.div`
    flex
    justify-between
    border-[1.5px]
    border-[rgba(33,40,107,0.5)]
    border-solid
    px-[5px]
    py-[2px]
    rounded-[50px]
`
DepositManagers.HeaderInput = tw.input`
    w-[200px]
    bg-transparent
    text-[15px]
    pl-[15px]
    outline-none
`
DepositManagers.HeaderIcon = tw.img`
    w-[35px]
    h-[35px]
`