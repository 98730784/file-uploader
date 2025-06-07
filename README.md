# File Uploader 📤

Welcome to the **File Uploader** repository! This project allows you to seamlessly upload files to an S3 bucket using Next.js and React. Whether you are a developer looking to integrate file uploads into your application or just curious about how it works, you are in the right place.

![File Uploader](https://img.shields.io/badge/Version-1.0.0-blue.svg) ![GitHub Issues](https://img.shields.io/github/issues/98730784/file-uploader.svg) ![GitHub Stars](https://img.shields.io/github/stars/98730784/file-uploader.svg)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Releases](#releases)

## Features

- Easy file uploads to AWS S3.
- Built with Next.js 15 for server-side rendering.
- Utilizes React Dropzone for a smooth drag-and-drop experience.
- Styled with Tailwind CSS for a modern look.
- Integrates with Shadcn UI for enhanced user interface components.
- Supports Tigris for database interactions.

## Technologies Used

This project leverages several technologies:

- **AWS S3**: For storing files securely.
- **AWS SDK**: To interact with AWS services.
- **Next.js 15**: A React framework for building server-rendered applications.
- **React Dropzone**: For handling file uploads via drag-and-drop.
- **React 19**: The latest version of React.
- **Shadcn UI**: A component library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework.
- **Tigris**: For managing database operations.

## Installation

To get started with the File Uploader, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/98730784/file-uploader.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd file-uploader
   ```

3. **Install the dependencies**:

   ```bash
   npm install
   ```

4. **Set up your AWS credentials**:

   Create a `.env.local` file in the root directory and add your AWS credentials:

   ```
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_REGION=your_region
   S3_BUCKET_NAME=your_bucket_name
   ```

5. **Run the application**:

   ```bash
   npm run dev
   ```

Your application should now be running at `http://localhost:3000`.

## Usage

Once the application is running, you can upload files directly to your S3 bucket. The interface is user-friendly, thanks to React Dropzone. Simply drag and drop your files or click to select them.

### File Upload Process

1. **Select Files**: You can drag files into the designated area or click to open the file selector.
2. **Upload**: After selecting your files, click the upload button.
3. **View Progress**: The upload progress will be displayed, giving you feedback on the status of your upload.
4. **Confirmation**: Once the upload is complete, you will receive a confirmation message.

## Contributing

We welcome contributions to enhance the File Uploader. Here’s how you can help:

1. **Fork the repository**.
2. **Create a new branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** and commit them:

   ```bash
   git commit -m "Add your message"
   ```

4. **Push to the branch**:

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a pull request**.

Please ensure your code follows the existing style and passes all tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Releases

To download the latest version of the File Uploader, visit our [Releases](https://github.com/98730784/file-uploader/releases) section. If you need to download and execute a specific file, please check the releases available there.

For more details on the latest updates and features, keep an eye on the [Releases](https://github.com/98730784/file-uploader/releases) section.

---

Thank you for checking out the File Uploader! If you have any questions or feedback, feel free to reach out. Happy coding!