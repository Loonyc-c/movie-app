import LogoWhite from "./icons/logo-white"
import EmailIcon from "./icons/email-icon"
import PhoneIcon from "./icons/phone-icon"
export const Footer = () => {

    // const handleClickOnGenre = () => {
    //      <div className="w-500px h-200px bg-black-500"> </div>
    // }

    return (
        <div className="w-screen bg-blue-500 flex justify-center">
        <div className="w-[1280px] h-[220px] pt-[20px] flex  justify-between">
            <div className="flex flex-col gap-[10px]">
                <LogoWhite />
                <p className="text-[14px] text-white">© 2024 Movie Z. All Rights Reserved.</p>
            </div>
            <div className="flex gap-[20px]">
                <div className="flex flex-col gap-[10px]">
                    <p className="text-[14px] text-white">contact info</p>
                    <div className="flex items-center gap-[10px]">
                        <EmailIcon />
                        <div>
                            <p className="text-[14px] text-white">email</p>
                            <p className="text-[14px] text-white">support@movieZ.com</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-[10px]">
                        <PhoneIcon />
                        <div>
                            <p className="text-[14px] text-white">Phone</p>
                            <p className="text-[14px] text-white">+976 (11) 123-4567</p>
                        </div>
                    </div>
                </div>
                <div className="text-[14px] text-white flex flex-col gap-[10px]">
                    <p>Follow us</p>
                    <div className="flex gap-[10px]">
                        <p>Facebook</p>
                        <p>Instagram</p>
                        <p>Twitter</p>
                        <p>YouTube</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}