import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon
} from '@radix-ui/react-icons';

export const users = [
    {
        id: '1',
        name: 'KJY'
    },
    {
        id: '3',
        name: 'PJH'
    },
    {
        id: '2',
        name: 'RGR'
    }
];

export const statuses = [
    {
        value: 'To Do',
        label: 'Todo',
        icon: CircleIcon
    },
    {
        value: 'Progress',
        label: 'In Progress',
        icon: StopwatchIcon
    },
    {
        value: 'Done',
        label: 'Done',
        icon: CheckCircledIcon
    },
];

export const priorities = [
    {
        label: 'Low',
        value: 'Low',
        icon: ArrowDownIcon
    },
    {
        label: 'Medium',
        value: 'Medium',
        icon: ArrowRightIcon
    },
    {
        label: 'High',
        value: 'High',
        icon: ArrowUpIcon
    }
];
