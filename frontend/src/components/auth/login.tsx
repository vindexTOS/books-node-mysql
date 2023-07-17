import React from 'react'
import { UseMainContext } from '../../context'
import Icon from '../../assets/icons/books.png'

import { useForm } from 'react-hook-form'

const Login = () => {
  const {
    register,
    authPopUpRef,
    authPopUp,
    registerSwitch,
    setRegisterSwitch,
    handleRegister,
    handleLogin,
  } = UseMainContext()
  const style = {
    section: `w-[100%] h-[100vh] bg-black/30 absolute top-0 flex items-center justify-center ${
      authPopUp ? '' : 'hidden'
    }`,
    img: `w-[60px]`,

    mainDiv: `w-[550px] h-[600px] py-40 bg-white shadow-2xl justify-around flex flex-col`,
    topDiv: `flex flex-col items-center justify-center `,
    inputDivWrapper: `flex items-center justify-center flex-col gap-5`,
    inputDiv: `outline-[1px] outline outline-gray-400 w-[50%] rounded-[3px] h-[2.5rem] flex items-center  px-3 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-gray-800/20`,
    btn: `text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm  text-center  w-[50%] h-[2.5rem]`,
    btnRegister: `text-white bg-[#ff5377] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-[#ff5377]-500/50 dark:shadow-lg dark:shadow-[#ff7558]/80 font-medium rounded-lg text-sm  text-center  w-[50%] h-[2.5rem]`,
  }

  return (
    <section className={style.section}>
      <div ref={authPopUpRef} className={style.mainDiv}>
        <div className={style.topDiv}>
          <img className={style.img} src={Icon} />
          <h1 className="text-[2rem] text-gray-600 font-bold">
            {!registerSwitch ? 'Log in to download' : 'Sign Up'}
          </h1>
          <p className="text-gray-400">
            Access our library with a free account
          </p>
        </div>
        <div className={style.inputDivWrapper}>
          {registerSwitch && (
            <div className={style.inputDiv}>
              <input
                {...register('name')}
                className="outline-none"
                type="text"
                placeholder="Your Name"
              />
            </div>
          )}
          <div className={style.inputDiv}>
            <input
              {...register('email')}
              className="outline-none"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className={style.inputDiv}>
            <input
              {...register('password')}
              className="outline-none"
              type="password"
              placeholder="Password"
            />
          </div>

          {registerSwitch ? (
            <button onClick={handleRegister} className={style.btn}>
              Register
            </button>
          ) : (
            <button onClick={handleLogin} className={style.btn}>
              Login
            </button>
          )}
        </div>

        {!registerSwitch ? (
          <div className={style.inputDivWrapper}>
            <p className="text-gray-400 mt-5 ">OR</p>

            <button
              onClick={() => setRegisterSwitch(!registerSwitch)}
              className={style.btnRegister}
            >
              Sign Up With Email
            </button>
          </div>
        ) : (
          <div className={style.inputDivWrapper}>
            <p className="text-gray-400 mt-5 ">OR</p>

            <button
              onClick={() => setRegisterSwitch(!registerSwitch)}
              className={style.btnRegister}
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Login
