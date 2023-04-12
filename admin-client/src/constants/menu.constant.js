import AddIcon from '@mui/icons-material/Add';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
export const MAIN_MENU = [
    {subMenu: 'User', menu: [
        {
            label: 'Add user',
            link: '/user/add',
            icon: <AddIcon/>
        }, 
        {
            label: 'View users',
            link: '/user',
            icon: <ViewHeadlineIcon/>
        }
    ]},
    {
        subMenu: 'Skill',
        menu: [
            {
                label: 'Add skill',
                link: '/skill/add',
                icon: <AddIcon/>
            },
            {
                label: 'View skills',
                link: '/skill',
                icon: <ViewHeadlineIcon/>
            }
        ]
    }
]