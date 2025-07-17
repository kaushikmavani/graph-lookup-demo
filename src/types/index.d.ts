declare global {
  namespace Express {
    interface Request {
      admin?: Record<string, any>
      user?: Record<string, any>
      token?: string
    }
  }
}

export {}
