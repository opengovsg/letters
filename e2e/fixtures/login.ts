import { expect } from '@playwright/test'
import fetch from 'cross-fetch'
import { randomInt } from 'crypto'
import { Page } from 'playwright'

export const generateTestEmail = () => {
  const suffix = randomInt(1e14)
  return `test-${suffix}@open.gov.sg`
}

const getOTP = async (testEmail: string) => {
  const res = await fetch('http://localhost:1080/email', { method: 'GET' })
  const mails = await res.json()
  const mail = mails.find((mail) => mail.headers.to === testEmail)
  const mailId = mail.id
  const otp = JSON.stringify(mail.html).match(/\d{6}/)[0]
  await fetch(`http://localhost:1080/email/${mailId}`, { method: 'DELETE' })
  return otp
}

export const login = async (page: Page, testEmail: string) => {
  await page.goto('/admin/login/')
  await page.getByPlaceholder('e.g. user@agency.gov.sg').fill(testEmail)
  await page.getByRole('button', { name: 'Sign in' }).click()
  await expect(page.getByPlaceholder('e.g. user@agency.gov.sg')).toHaveCount(0)

  const otp = await getOTP(testEmail)
  await page.getByRole('textbox').fill(otp)
  await page.getByRole('button', { name: 'Sign in' }).click()
}
