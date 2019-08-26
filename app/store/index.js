import bikeshops from './bikeshops.json'

export const state = () => ({
  navDrawerOpen: false,
  pagination: {
    default: {
      current: null,
      pages: [],
      postsPerPage: 30
    },
    category: {
      current: {},
    },
    search: {
      current: null,
      pages: [],
      postsPerPage: 30
    }
  },
  current: {
    slug: '',
    id: null
  },
  shops: bikeshops,
  posts: [],
  pages: [],
  categories: {},
  contestPost: [],
  navItems: [
    {
      name: 'News',
      href: '/category/news'
    },
    {
      name: 'Gear',
      href: '/category/gear'
    },
    {
      name: 'Features',
      href: '/category/feature'
    },
    {
      name: 'Contests',
      href: '/category/contests'
    },
    {
      name: 'Video',
      href: '/category/video'
    },
    {
      name: 'Opinion',
      href: '/category/opinion'
    },
    {
      name: 'Store',
      href: 'https://dirtragmag.threadless.com/'
    },
    {
      name: 'Subscribe',
      href:
        'https://w1.buysub.com/pubs/RG/DRM/DRM_subpage_print_dig.jsp?cds_page_id=164525'
    }
  ],
  // TODO: Control footerLinks from WordPress
  footerLinks: [
    {
      name: 'Newsletter Signup',
      href: 'https://rotatingmassmedia.us6.list-manage.com/subscribe?u=ae6a3a216e3721cb2cb9885ce&id=ddc46c4c51'
    },
    {
      name: 'Staff',
      href: '/staff'
    },
    {
      name: 'Contact Us',
      href: '/contact'
    },
    {
      name: 'Cool Shops',
      href: '/coolshops'
    },
    {
      name: 'Advertise',
      href: 'https://www.rotatingmassmedia.com/dirtrag'
    },
    {
      name: 'Contribute',
      href: '/contribute'
    },
    {
      name: 'Mission Statement',
      href: '/mission-statement'
    },
    {
      name: 'Privacy Policy',
      href: '/privacy-policy'
    }
  ],
  advertising: {
    rectangle: [
      {
        name: 'DR_300x250_Square1',
        id: 'div-gpt-ad-1545012093060-0',
        size: 'rectangle',
        type: 'ad'
      },
      {
        name: 'DR_300x250_Square2',
        id: 'div-gpt-ad-1545012247418-0',
        size: 'rectangle',
        type: 'ad'
      },
      {
        name: 'DR_300x250_Square3',
        id: 'div-gpt-ad-1545012276260-0',
        size: 'rectangle',
        type: 'ad'
      },
      {
        name: 'DR_300x250_Square4',
        id: 'div-gpt-ad-1545012307510-0',
        size: 'rectangle',
        type: 'ad'
      },
      {
        name: 'DR_300x250_Square5',
        id: 'div-gpt-ad-1545012331175-0',
        size: 'rectangle',
        type: 'ad'
      },
      {
        name: 'DR_300x250_Square6',
        id: 'div-gpt-ad-1545012351438-0',
        size: 'rectangle',
        type: 'ad'
      },
      {
        name: 'DR_300x250_Square7',
        id: 'div-gpt-ad-1545012376898-0',
        size: 'rectangle',
        type: 'ad'
      },
      {
        name: 'DR_300x250_Square8',
        id: 'div-gpt-ad-1545012399546-0',
        size: 'rectangle',
        type: 'ad'
      },
      {
        name: 'DR_300x250_SquareNine',
        id: 'div-gpt-ad-1545012424403-0',
        size: 'rectangle',
        type: 'ad'
      },
      {
        name: 'DR_300x250_SquareTen',
        id: 'div-gpt-ad-1545012446845-0',
        size: 'rectangle',
        type: 'ad'
      }
    ]
  }
})
