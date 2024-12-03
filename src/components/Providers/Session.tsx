"use client"

import { SessionProvider } from 'next-auth/react'
import React, { FC, ReactNode } from 'react'

interface SessionProps {
    children: ReactNode
}

const Session:FC<SessionProps> = ({ children }) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default Session