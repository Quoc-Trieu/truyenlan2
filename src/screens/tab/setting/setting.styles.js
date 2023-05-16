import tw from 'tailwind-styled-components';

export const SettingW = tw.div`

`
SettingW.Header = tw.div`
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
SettingW.Body = tw.div`
    w-full
    h-[calc(100vh-theme(spacing.header))]
    bg-[#fff]
    p-[20px]
    flex
    gap-[30px]
`
SettingW.Left = tw.form`
    flex-[3]
    flex
    flex-col
    rounded-[7px]
    bg-[#F0F4FF]
    h-fit
    overflow-hidden
`
SettingW.Right = tw.div`
    flex-[7]
`