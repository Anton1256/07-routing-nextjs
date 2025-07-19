'use client'

import React from 'react'

type ErrorProps = {
    error: Error
}

const Error = ({error}:ErrorProps) => {
  return (
    <div>
        <p>Could not fetch note details. {error.message}</p>
    </div>
  )
}

export default Error