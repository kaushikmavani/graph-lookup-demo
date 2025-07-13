import z from "zod/v4"
import config from "../../config/app.config"

export const loginSchema = z.object({
  body: z.object({
    email: z.email({
      error: (issue) => {
        return issue.input === undefined ? config.messages.emailRequired : config.messages.invalidEmail
      },
    }),
    password: z
      .string({
        error: (issue) => (issue.input === undefined ? config.messages.passwordRequired : issue.message),
      })
      .min(6, { error: config.messages.passwordMinSix }),
  }),
})

export type LoginSchemaType = z.infer<typeof loginSchema>
