import React from 'react'
import Icon from '../../assets/icons/books.png'
import { CiSearch } from 'react-icons/ci'
import { UseMainContext } from '../../context'
const NavBar = () => {
  const { setAuthPopUp } = UseMainContext()
  const style = {
    nav: `nav-bar-bg w-[100%] h-[90px] flex items-center justify-around`,
    img: `w-[40px]`,
    firstDivWrapper: `flex items-center justify-between gap-10`,
    serachWrapper: `bg-white w-[290px] flex justify-between h-[2.3rem] rounded-[20px]`,
    input: `w-[80%] px-5 outline-none rounded-l-[4px]`,
    btn: `bg-[#17a288] w-[2.4rem] flex items-center justify-center text-white text-[1.5rem] rounded-r-[4px]`,
  }

  return (
    <nav className={style.nav}>
      <div className={style.firstDivWrapper}>
        <img className={style.img} src={Icon} />
        <div className={style.serachWrapper}>
          <input
            className={style.input}
            placeholder="Search by title, author"
          />
          <button className={style.btn}>
            <CiSearch />
          </button>
        </div>
      </div>
      <div>
        <button
          onClick={() => setAuthPopUp(true)}
          className="text-white hover:text-blue-200"
        >
          Sign in
        </button>
      </div>
    </nav>
  )
}

export default NavBar
