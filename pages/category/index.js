import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/db/getSiteData'
import { DynamicLayout } from '@/themes/theme'

/**
 * 分类首页
 * @param {*} props
 * @returns
 */
export default function Category(props) {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return (
    <DynamicLayout theme={theme} layoutName='LayoutCategoryIndex' {...props} />
  )
}

export async function getStaticProps({ locale }) {
  const props = await getGlobalData({ from: 'category-index-props', locale })
  delete props.allPages
  return {
    props,
    revalidate: process.env.EXPORT
      ? undefined
      : siteConfig(
          'NEXT_REVALIDATE_SECOND',
          BLOG.NEXT_REVALIDATE_SECOND,
          props.NOTION_CONFIG
        )
  }
}

export async function getStaticPaths() {
  let categories = [];
  try {
    // Example of fetching data from an API
    const res = await fetch('https://api.example.com/categories');
    const data = await res.json();
    // Assuming the API returns an array of category objects
    categories = data.categories || []; 
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    // In case of an error, fall back to an empty array
    categories = [];
  }
  
  // Map the fetched data to the required paths format
  const paths = categories.map((category) => ({
    params: { category: category.slug },
  }));
  
  // Return the paths and a fallback option
  return {
    paths,
    fallback: false, // or 'blocking' or true depending on your needs
  };
}
