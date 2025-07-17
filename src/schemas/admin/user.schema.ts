import z from "zod/v4"
import config from "../../config/app.config"
import mongoose from "mongoose"

export const getAllUsersSchema = z.object({
  query: z.object({
    page: z.coerce
      .number({ error: (issue) => (issue.input === undefined ? "" : config.messages.invalidPage) })
      .optional(),
    limit: z.coerce
      .number({ error: (issue) => (issue.input === undefined ? "" : config.messages.invalidLimit) })
      .optional(),
  }),
})

export const getUserSchema = z.object({
  params: z.object({
    id: z
      .string({ error: (issue) => (issue.input === undefined ? config.messages.idRequired : issue.message) })
      .refine((val) => mongoose.Types.ObjectId.isValid(val), { error: config.messages.invalidId }),
  }),
})

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({ error: (issue) => (issue.input === undefined ? config.messages.nameRequired : issue.message) })
      .min(1, { error: config.messages.nameRequired }),
    email: z.email({
      error: (issue) => (issue.input === undefined ? config.messages.emailRequired : config.messages.invalidEmail),
    }),
    password: z
      .string({
        error: (issue) => (issue.input === undefined ? config.messages.passwordRequired : issue.message),
      })
      .min(6, { error: config.messages.passwordMinSix }),
    parentUserId: z
      .string({ error: (issue) => (issue.input === undefined ? "" : config.messages.invalidParentUserId) })
      .refine(
        (val) => {
          if (!val) return true
          return mongoose.Types.ObjectId.isValid(val)
        },
        { error: config.messages.invalidParentUserId }
      )
      .optional(),
  }),
})

export const updateUserSchema = z.object({
  params: z.object({
    id: z
      .string({ error: (issue) => (issue.input === undefined ? config.messages.idRequired : issue.message) })
      .refine((val) => mongoose.Types.ObjectId.isValid(val), { error: config.messages.invalidId }),
  }),
  body: z.object({
    name: z
      .string({ error: (issue) => (issue.input === undefined ? config.messages.nameRequired : issue.message) })
      .min(1, { error: config.messages.nameRequired }),
    email: z.email({
      error: (issue) => (issue.input === undefined ? config.messages.emailRequired : config.messages.invalidEmail),
    }),
    parentUserId: z
      .string({ error: (issue) => (issue.input === undefined ? "" : config.messages.invalidParentUserId) })
      .refine(
        (val) => {
          if (!val) return true
          return mongoose.Types.ObjectId.isValid(val)
        },
        { error: config.messages.invalidParentUserId }
      )
      .optional(),
  }),
})

export const deleteUserSchema = z.object({
  params: z.object({
    id: z
      .string({ error: (issue) => (issue.input === undefined ? config.messages.idRequired : issue.message) })
      .refine((val) => mongoose.Types.ObjectId.isValid(val), { error: config.messages.invalidId }),
  }),
})

export type GetAllUsersSchemaType = z.infer<typeof getAllUsersSchema>
export type GetUserSchemaType = z.infer<typeof getUserSchema>
export type CreateUserSchemaType = z.infer<typeof createUserSchema>
export type updateUserSchemaType = z.infer<typeof updateUserSchema>
export type deleteUserSchemaType = z.infer<typeof deleteUserSchema>
