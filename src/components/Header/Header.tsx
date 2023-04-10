import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "src/apis/auth.api";
import path from "src/constants/path";
import { AppContext } from "src/contexts/app.context";
import Popover from "../Popover";
export default function Header() {
    const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
    const logoutMutation = useMutation({
        mutationFn: authApi.logoutAccount,
        onSuccess: () => {
            setIsAuthenticated(false)
            setProfile(null)
        }
    })
    const handleLogout = () => {
        logoutMutation.mutate();
    }
    return (
    <div className="pb-5 pt-2 bg-[linear-gradient(-180deg,#f53d2d,#f63)]">
        <div className="container">
            <div className="flex justify-end">
                <Popover 
                    as ='span'
                    className="flex items-center py-1 hover:text-gray-300 cursor-pointer"
                    renderPopover={
                        <div className="bg-white relative shadow-md rounded-sm border border-gray-200">
                            <div className="flex flex-col py-2 pr-28 pl-3">
                                <button className="px-3 py-2 hover:text-orange">Tiếng Việt</button>
                                <button className="py-2 px-3 hover:text-orange mt-2">English</button>
                            </div>
                        </div> 
                    }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                    </svg>
                    <span className="mx-1">Tiếng Việt</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </Popover>
                { isAuthenticated && (
                    <Popover
                        className="flex items-center py-1 hover:text-gray-300 cursor-pointer ml-6"
                        renderPopover={
                            <div className="bg-white relative shadow-md rounded-sm border border-gray-200">
                                <Link to={path.profile} className="block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left">
                                    Tài khoản của tôi 
                                </Link>
                                <Link to='/' className="block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left">
                                    Đơn hàng đã mua 
                                </Link>
                                <button className="block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full" onClick={handleLogout}>
                                    Đăng xuất
                                </button>
                            </div>
                        }
                    >
                        <div className="w-6 h-6 mr-2 flex-shrink-0">
                            <img src="https://down-vn.img.susercontent.com/file/014f9db89acf03076b69d47e3930d9a3_tn" alt="avatar" className="w-full h-full object-cover rounded-full" />
                        </div>
                        <div>{profile?.email}</div>
                    </Popover>
                )}
                {
                    !isAuthenticated && (
                        <div className="flex items-center">
                            <Link to={path.register} className="mx-3 capitalize hover:text-white/70">
                                Đăng kí
                            </Link>
                            <div className="border-r-[1px] border-r-white/40 h-4"/>
                            <Link to={path.login} className="mx-3 capitalize hover:text-white/70">
                                Đăng nhập
                            </Link>
                        </div>
                    )
                }              
            </div>
            <div className="grid grid-cols-12 gap-14 nt-4 items-end">
                <Link to='/' className="col-span-2 flex flex-column justify-center content-center">
                    <svg className='h-11 w-full fill-white'  version="1.0" viewBox="0 0 860.000000 900.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,900.000000) scale(0.100000,-0.100000)" stroke="none">
                        <path d="M4079 8576 c-3 -3 -56 -7 -119 -11 -63 -3 -182 -17 -265 -31 -82 -14 -166 -28 -185 -30 -19 -3 -42 -8 -50 -11 -8 -3 -24 -7 -35 -9 -38 -5 -258 -65 -276 -75 -11 -5 -19 -8 -19 -5 0 2 -37 -9 -82 -25 -46 -17 -92 -33 -103 -35 -25 -7 -29 -8 -219 -90 -87 -37 -164 -73 -170 -79 -6 -5 -15 -10 -21 -11 -26 -1 -66 -25 -59 -36 4 -7 3 -8 -5 -4 -6 4 -41 -10 -78 -31 -97 -55 -116 -65 -159 -90 -22 -12 -49 -31 -61 -43 -13 -11 -23 -18 -23 -15 0 5 -65 -38 -190 -125 -45 -32 -230 -179 -250 -200 -8 -8 -33 -31 -55 -50 -22 -18 -39 -38 -37 -42 1 -4 -2 -7 -7 -6 -13 4 -112 -92 -106 -102 3 -6 -1 -7 -9 -4 -9 3 -16 2 -16 -3 0 -5 -36 -46 -80 -91 -44 -44 -80 -83 -80 -86 0 -3 -14 -19 -30 -36 -17 -17 -27 -36 -24 -42 4 -6 3 -8 -3 -5 -10 6 -65 -58 -162 -188 -28 -38 -55 -74 -59 -80 -4 -5 -27 -39 -51 -75 -25 -36 -52 -76 -61 -90 -10 -14 -28 -46 -40 -70 -12 -25 -28 -48 -34 -52 -6 -5 -7 -8 -1 -8 6 0 5 -4 -1 -8 -10 -6 -124 -206 -124 -217 0 -6 -68 -154 -86 -188 -9 -15 -13 -37 -9 -50 4 -15 3 -18 -3 -9 -7 11 -10 10 -15 -5 -4 -10 -13 -36 -21 -57 -8 -22 -12 -44 -9 -49 3 -6 1 -7 -4 -4 -6 4 -15 -9 -21 -31 -6 -20 -22 -71 -37 -112 -43 -125 -46 -133 -67 -210 -155 -564 -180 -1182 -72 -1790 14 -77 20 -104 39 -177 4 -13 9 -35 11 -50 8 -42 43 -175 53 -198 5 -11 23 -66 41 -122 18 -57 36 -100 41 -97 5 3 7 -1 4 -8 -7 -18 29 -110 40 -101 4 5 5 3 2 -3 -8 -13 17 -79 33 -89 5 -3 10 -15 10 -26 0 -10 5 -19 11 -19 5 0 8 -4 5 -9 -3 -4 26 -71 64 -147 99 -197 118 -229 130 -226 7 1 9 -2 6 -7 -9 -13 29 -73 39 -63 5 4 5 1 1 -6 -9 -15 64 -123 78 -115 5 4 6 1 3 -4 -4 -6 7 -29 23 -52 17 -22 30 -43 30 -46 0 -3 4 -11 10 -18 52 -63 147 -183 155 -195 19 -29 50 -57 60 -54 5 2 7 0 3 -4 -11 -10 12 -35 25 -27 6 4 7 1 3 -6 -10 -15 23 -53 37 -44 5 3 7 2 4 -4 -8 -13 112 -145 125 -137 6 4 8 3 5 -3 -7 -12 76 -94 253 -248 19 -17 57 -48 85 -70 27 -22 59 -48 69 -58 11 -9 23 -17 27 -17 4 0 14 -6 21 -13 7 -7 29 -24 48 -37 19 -13 37 -27 40 -31 8 -11 310 -199 310 -193 0 3 7 -1 15 -10 9 -8 23 -12 32 -9 10 4 14 2 10 -4 -4 -6 8 -16 26 -24 17 -7 34 -16 37 -20 11 -15 71 -39 82 -33 7 5 8 3 3 -6 -6 -10 -4 -12 9 -7 9 4 15 3 12 -1 -3 -5 14 -17 37 -27 23 -10 65 -28 92 -40 119 -54 150 -67 218 -91 40 -14 79 -27 89 -29 9 -2 30 -11 46 -19 17 -9 38 -13 46 -10 9 3 16 1 16 -5 0 -6 10 -11 23 -11 13 0 27 -4 32 -9 6 -4 30 -14 55 -20 25 -7 61 -16 80 -22 81 -22 140 -34 305 -63 50 -9 113 -20 140 -26 28 -5 133 -17 235 -26 202 -18 568 -15 735 6 236 29 451 65 540 92 22 6 43 11 48 10 4 -1 7 3 7 9 0 5 5 7 10 4 6 -4 40 3 75 14 35 12 71 21 80 21 8 0 15 5 15 11 0 5 4 8 9 5 22 -14 526 185 564 223 6 6 17 11 25 11 25 0 202 103 195 113 -3 6 -1 7 5 3 11 -6 51 9 62 24 3 3 31 22 64 41 109 64 125 74 143 89 10 9 41 31 68 50 28 18 64 45 81 59 51 42 68 55 97 74 15 10 25 23 21 29 -4 6 -3 8 3 5 6 -4 22 3 35 16 112 100 184 164 196 173 8 6 12 16 8 22 -4 7 -2 10 7 6 16 -6 233 221 231 242 -1 8 2 12 6 9 14 -9 164 176 280 345 19 28 41 58 47 68 27 36 83 124 83 128 0 3 11 22 25 44 55 87 164 297 209 400 15 36 34 79 42 95 28 61 79 200 77 214 -1 8 5 20 13 28 8 8 14 22 14 30 0 9 11 49 25 89 14 40 24 77 24 81 -1 4 3 20 9 34 5 14 13 39 15 55 3 16 12 54 20 84 13 48 28 124 67 335 5 28 12 79 15 115 2 36 9 110 15 165 12 128 12 473 0 590 -5 50 -12 122 -15 160 -3 39 -10 93 -15 120 -5 28 -11 71 -15 97 -3 26 -11 50 -16 54 -5 3 -7 13 -5 22 11 34 -79 383 -153 592 -33 96 -51 140 -121 300 -37 83 -156 317 -174 340 -6 8 -21 33 -33 55 -22 40 -104 169 -123 192 -6 7 -10 16 -10 21 0 14 -27 34 -32 25 -3 -4 -3 -2 -1 6 4 16 -131 199 -153 208 -7 3 -12 9 -9 13 3 5 -3 15 -12 22 -10 7 -29 29 -42 48 -37 52 -74 90 -83 84 -5 -3 -7 0 -6 8 2 7 -3 12 -10 10 -8 -1 -11 2 -8 7 9 13 -34 62 -47 54 -7 -3 -9 -3 -6 1 8 9 -63 86 -79 86 -7 0 -12 6 -12 13 0 16 -54 69 -63 62 -4 -3 -5 -2 -2 1 2 4 -15 23 -37 43 -23 20 -50 46 -61 59 -12 12 -25 22 -30 22 -6 0 -27 17 -47 38 -48 48 -212 174 -315 242 -44 29 -98 65 -120 79 -22 15 -53 33 -70 41 -16 8 -38 22 -48 31 -16 14 -335 177 -422 216 -153 67 -353 135 -368 126 -6 -3 -7 -1 -3 5 4 7 -7 13 -31 17 -21 4 -52 13 -70 21 -17 8 -40 14 -52 14 -11 0 -30 4 -43 9 -109 42 -365 87 -668 116 -141 13 -560 21 -571 11z m77 -1442 c58 22 394 -8 394 -36 0 -4 7 -8 16 -8 20 0 82 -28 113 -52 13 -10 27 -15 32 -12 5 3 9 1 9 -5 0 -5 8 -12 18 -15 9 -3 42 -29 72 -58 30 -28 60 -50 65 -49 6 1 7 -1 3 -5 -4 -4 14 -32 40 -63 56 -66 86 -110 138 -206 21 -38 42 -71 46 -73 4 -2 8 -11 8 -20 0 -10 9 -34 20 -55 11 -20 20 -40 20 -44 1 -21 24 -83 31 -83 4 0 7 -10 7 -22 0 -13 5 -41 12 -63 6 -22 18 -69 26 -105 8 -36 19 -84 24 -108 6 -24 13 -76 15 -115 9 -125 16 -171 27 -184 8 -10 128 -13 565 -13 613 0 577 4 646 -67 57 -60 62 -109 38 -411 -19 -235 -30 -394 -36 -527 -7 -134 -17 -264 -25 -325 -5 -36 -12 -121 -16 -190 -10 -185 -11 -200 -18 -260 -3 -30 -8 -100 -11 -155 -3 -55 -10 -154 -15 -220 -14 -171 -38 -502 -55 -770 -16 -261 -26 -307 -101 -460 -16 -33 -28 -64 -26 -70 2 -5 1 -7 -3 -3 -4 4 -24 -15 -45 -41 -60 -76 -176 -145 -273 -161 -52 -9 -3223 -14 -3237 -5 -4 3 -25 7 -45 11 -21 3 -71 23 -111 44 -39 21 -75 36 -80 32 -4 -4 -4 -2 -1 4 3 6 -14 30 -38 54 -25 24 -45 47 -45 51 0 4 -15 32 -34 64 -51 83 -76 173 -87 310 -5 66 -11 130 -14 142 -3 12 -8 84 -11 160 -3 76 -10 176 -15 223 -5 47 -12 126 -14 175 -3 50 -8 106 -11 125 -3 19 -5 49 -5 65 2 30 -16 277 -44 640 -9 105 -17 228 -19 275 -6 134 -33 516 -45 615 -20 177 -32 469 -21 519 6 26 7 52 4 58 -4 6 -3 8 2 5 5 -3 21 8 34 25 14 17 44 40 67 50 40 18 76 19 586 18 468 0 546 2 557 14 6 8 9 20 5 26 -3 5 -3 10 2 10 4 0 9 24 9 53 1 63 29 264 45 327 11 45 40 146 60 207 5 18 12 40 14 50 4 23 39 103 74 173 15 30 26 61 23 69 -2 8 0 11 5 8 6 -4 28 21 49 56 51 83 48 80 136 168 43 43 91 85 108 94 17 9 28 20 25 26 -4 5 -3 9 2 8 20 -3 34 2 28 11 -4 6 -3 9 2 8 17 -4 53 14 47 24 -4 7 -2 8 4 4 6 -4 24 -1 39 7 15 8 56 20 91 28 43 9 62 18 62 29 0 12 2 13 9 1 6 -9 16 -11 27 -7z"/>
                        <path d="M4218 6864 c-48 -7 -98 -19 -110 -26 -13 -6 -31 -13 -40 -15 -21 -3 -110 -63 -121 -80 -4 -7 -15 -13 -22 -13 -8 0 -15 -5 -15 -10 0 -6 -15 -25 -33 -43 -113 -111 -204 -318 -266 -602 -17 -81 -40 -303 -33 -324 5 -14 1418 -15 1427 -2 10 18 -36 327 -57 379 -6 15 -10 35 -9 45 1 10 -2 24 -7 30 -5 7 -14 38 -21 70 -8 36 -16 55 -23 51 -7 -4 -8 -2 -4 4 7 12 -39 129 -58 147 -6 6 -13 19 -14 30 -2 11 -12 29 -23 41 -11 11 -16 24 -12 27 3 4 1 7 -5 7 -7 0 -12 5 -12 11 0 18 -129 158 -180 195 -44 33 -108 58 -142 56 -10 0 -18 3 -18 9 0 5 -3 8 -7 7 -5 -1 -20 2 -35 5 -58 14 -75 14 -160 1z"/>
                        <path d="M4245 5104 c-11 -3 -56 -12 -100 -20 -173 -34 -362 -169 -429 -309 -16 -33 -33 -68 -37 -77 -18 -36 -30 -156 -24 -223 10 -104 51 -181 144 -274 42 -43 96 -91 121 -107 75 -50 189 -106 202 -98 7 4 8 3 4 -4 -4 -7 -1 -12 6 -13 29 -1 51 -8 57 -17 3 -5 31 -18 61 -27 79 -26 128 -44 185 -70 28 -12 61 -26 75 -30 14 -4 32 -13 40 -20 8 -7 34 -22 57 -34 84 -42 203 -141 241 -199 52 -82 64 -125 64 -225 0 -78 -3 -94 -31 -150 -35 -71 -59 -100 -116 -142 -22 -16 -43 -34 -46 -38 -3 -5 -9 -8 -13 -7 -9 2 -66 -24 -66 -30 0 -3 -9 -6 -19 -7 -11 -1 -41 -9 -68 -19 -63 -23 -245 -30 -338 -14 -138 23 -378 115 -436 166 -8 8 -20 14 -26 14 -6 0 -13 4 -15 9 -1 4 -23 20 -47 36 -44 27 -45 27 -75 9 -73 -42 -76 -86 -8 -141 61 -51 142 -106 142 -97 0 4 8 0 18 -8 18 -16 126 -61 138 -58 4 1 10 -2 13 -7 11 -16 85 -42 176 -62 182 -40 400 -34 540 15 39 14 77 27 85 29 22 5 111 56 130 74 9 9 32 30 51 47 54 46 118 136 139 195 26 71 35 129 34 229 -1 77 -5 93 -39 168 -21 45 -42 82 -47 82 -4 0 -8 5 -8 11 0 18 -110 139 -126 139 -9 0 -13 4 -10 9 8 12 -112 94 -126 85 -6 -4 -8 -3 -5 3 3 5 -11 18 -31 28 -20 11 -40 23 -43 28 -3 4 -15 9 -27 10 -11 0 -19 4 -16 9 3 4 -15 13 -38 19 -24 7 -47 16 -53 19 -5 4 -28 13 -50 20 -22 7 -42 16 -45 19 -3 4 -34 15 -70 26 -117 33 -333 142 -395 198 -56 51 -85 82 -85 90 0 4 -4 6 -8 3 -5 -3 -9 0 -10 7 0 7 -8 32 -17 57 -23 61 -15 184 17 248 36 71 164 194 222 211 17 5 56 19 86 31 88 34 230 36 350 5 52 -14 103 -29 112 -35 10 -5 24 -10 31 -10 7 0 52 -22 100 -50 107 -61 137 -64 167 -15 29 46 21 72 -33 110 -52 37 -157 97 -157 90 0 -3 -10 1 -22 9 -31 20 -165 56 -209 56 -19 0 -39 3 -43 8 -13 12 -164 24 -201 16z m-654 -2031 c13 -16 12 -17 -3 -4 -17 13 -22 21 -14 21 2 0 10 -8 17 -17z"/>
                        </g>
                    </svg>
                    <div className="w-10 h-6 mt-3 font-semibold text-white font-sans">GEAR3S</div>
                </Link>
                <form className="col-span-9">
                    <div className="bg-white rounded-sm p-1 flex">
                        <input type="text" name="search" className="text-black px-3 py-2 flex-grow border-none outline-none bg-transparent" />
                        <button className="rounded-sm py-2 px-6 flex-shrink-0 bg-orange hover:opacity-90">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        </button>
                    </div>
                </form>
                <div className="cols-span-1 justify-self-start">
                    <Popover 
                        renderPopover={
                        <div className="bg-white relative shadow-md rounded-sm border border-gray-200 max-w-[400px] text-sm">
                            <div className="p-2">
                                <div className="text-gray-400 capitalize">
                                    Sản phẩm mới thêm 
                                </div>
                                <div className="mt-5">
                                    <div className="mt-4 flex">
                                        <div className="flex-shrink-0">
                                            <img src="" alt="image" />
                                        </div>
                                        <div className="flex-grow ml-2 overflow-hidden">
                                            <div className="truncate">
                                                Túi chống sốc LAPTOP LOẠI DÀY từ 10 inch - 17 inch
                                            </div>
                                        </div>
                                        <div className="ml-2 flex-shrink-0">
                                            <span className="text-orange">
                                                469,000
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex mt-6 items-center justify-between">
                                    <div className="capitalize text-xs text-gray-500">
                                        Thêm hàng vào giỏ
                                    </div>
                                    <button className="capitalize bg-orange hover:bg-opacity-80 px-4 py-2 rounded-sm text-white">
                                        Xem giỏ hàng 
                                    </button>
                                </div>
                            </div>
                        </div>
                    }>
                        <Link to='/'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </Link>
                    </Popover>
                </div>
            </div>
        </div>
    </div>
  )
}
