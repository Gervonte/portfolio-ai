# Email Service Setup

This portfolio uses Resend for email functionality. Follow these steps to set up email sending:

## 1. Get Resend API Key

1. Go to [Resend.com](https://resend.com)
2. Sign up for a free account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the API key

## 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
# Resend API Key for email functionality
RESEND_API_KEY=your_resend_api_key_here

# Optional: Custom domain for sending emails
# For Vercel: portfolio-ai-xi.vercel.app
# For custom domain: yourdomain.com
RESEND_DOMAIN=portfolio-ai-xi.vercel.app
```

## 3. Verify Domain (Optional)

For production use, you should verify your domain:

1. In Resend dashboard, go to Domains
2. Add your domain (e.g., yourdomain.com)
3. Follow DNS verification steps
4. Update the `from` field in `src/app/api/contact/route.ts`

## 4. Test Email Functionality

1. Start the development server: `npm run dev`
2. Navigate to the contact section
3. Fill out and submit the contact form
4. Check your email for the message

## 5. Vercel Deployment

Since you're using Vercel, add these environment variables in your Vercel dashboard:

1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Settings** > **Environment Variables**
3. Add the following variables:
   - `RESEND_API_KEY`: Your Resend API key
   - `RESEND_DOMAIN`: `portfolio-ai-xi.vercel.app` (or your custom domain)

**Note**: Vercel will automatically redeploy when you add environment variables.

## Email Template

The contact form sends emails with:

- Professional HTML formatting
- Sender information (name, email, subject)
- Message content
- Reply-to set to sender's email
- Portfolio branding

## Troubleshooting

- Check browser console for error messages
- Verify API key is correct
- Ensure environment variables are loaded
- Check Resend dashboard for delivery status
