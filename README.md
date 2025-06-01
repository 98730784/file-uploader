# S3 File Uploader

A modern, user-friendly file upload application built with Next.js and Tigirus S3 buckets. This application allows users to easily upload files to Tigirus S3 storage with a beautiful drag-and-drop interface, real-time progress tracking, and instant feedback.

## Features

- **Drag and Drop Interface**: Intuitive file upload with drag-and-drop functionality
- **Multiple File Upload**: Upload up to 5 files simultaneously
- **File Type Validation**: Supports images (PNG, JPEG, JPG), PDFs, and text files
- **Size Restrictions**: Limits uploads to 10MB per file
- **Real-time Progress**: Visual progress bars for each uploading file
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Direct S3 Upload**: Uses presigned URLs for secure, direct-to-S3 uploads
- **Instant Feedback**: Toast notifications for success and error states

## Screenshots

### Upload Interface
![Upload Interface](./screenshots/Screen%20Shot%202025-06-01%20at%2018.50.10.png)

### File Upload in Progress
![Upload Progress](./screenshots/Screen%20Shot%202025-06-01%20at%2018.52.31.png)

### Completed Uploads
![Completed Uploads](./screenshots/Screen%20Shot%202025-06-01%20at%2018.53.00.png)

## Technologies Used

- **Frontend**:
  - Next.js 15.3.3
  - React 19.0.0
  - TypeScript
  - TailwindCSS
  - React Dropzone
  - Radix UI Components
  - Sonner (for toast notifications)

- **Backend**:
  - Next.js API Routes
  - AWS SDK for S3
  - S3 Presigned URLs

- **Deployment**:
  - Vercel (recommended)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Setup

To use this application with your own Tigirus S3 buckets, you'll need to set up the following environment variables:

```
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_ENDPOINT_URL_S3=your_s3_endpoint_url
AWS_ENDPOINT_URL_IAM=your_iam_endpoint_url
AWS_REGION=your_region
S3_BUCKET_NAME=your_bucket_name
```

Note: Despite the "AWS_" prefix, these variables are used to configure the connection to Tigirus S3 storage, which uses the AWS S3 API.

## Deployment with GitHub Actions

This project includes a GitHub Actions workflow for automatic deployment to Vercel. When you push changes to the main branch, the workflow will build and deploy your application to Vercel.

### Setting Up GitHub Secrets

To use the GitHub Actions workflow, you need to set up the following secrets in your GitHub repository:

1. **Vercel Deployment Secrets**:
   - `VERCEL_TOKEN`: Your Vercel API token
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

2. **S3 Configuration Secrets**:
   - `AWS_ACCESS_KEY_ID`: Your Tigirus/AWS access key
   - `AWS_SECRET_ACCESS_KEY`: Your Tigirus/AWS secret key
   - `AWS_ENDPOINT_URL_S3`: Your S3 endpoint URL
   - `AWS_ENDPOINT_URL_IAM`: Your IAM endpoint URL
   - `AWS_REGION`: Your region
   - `S3_BUCKET_NAME`: Your bucket name

### How to Get Vercel Deployment Values

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel login` and follow the instructions
3. Run `vercel link` to link your local project to a Vercel project
4. The Vercel project ID and org ID will be saved in the `.vercel` directory
5. Create a Vercel token in your Vercel account settings

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tigirus S3 Documentation](https://docs.tigirus.com/s3/)
- [React Dropzone](https://react-dropzone.js.org/)
- [Vercel Deployment](https://vercel.com/docs/deployments/overview)
- [GitHub Actions](https://docs.github.com/en/actions)
