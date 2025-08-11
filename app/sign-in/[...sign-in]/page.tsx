import React from 'react'
import { SignIn } from '@clerk/nextjs'
const Signin = () => {
  console.log("Signin page");
  return (
    <div>
      <SignIn/>
    </div>
  )
}

export default Signin
