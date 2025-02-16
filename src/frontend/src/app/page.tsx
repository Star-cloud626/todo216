// import HomePage from '@/app/(delete-this-and-modify-page.tsx)/HomePage';
import {redirect} from 'next/navigation';

/**
 * The main page component that renders the HomePage component.
 *
 * @returns {JSX.Element} The rendered HomePage component.
 */
const Page = () => redirect("/list");
export default Page;
