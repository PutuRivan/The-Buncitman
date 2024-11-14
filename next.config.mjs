/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                hostname:'placehold.co'
            },
            {
                hostname:'res.cloudinary.com'
            }
        ]
    }
};

export default nextConfig;
