import { faker } from '@faker-js/faker';

import { users, priorities, statuses } from './data';
import fs from 'fs';
import path from 'path';

const tasks = Array.from({ length: 100 }, () => ({
    id: `TASK-${faker.number.int({ min: 1000, max: 9999 })}`,
    title: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
    description: faker.hacker.phrase().replace(/^./, (letter) => letter),
    status: faker.helpers.arrayElement(statuses).value,
    due_date: faker.date.past(),
    priority: faker.helpers.arrayElement(priorities).value,
    assigned_to: faker.helpers.arrayElement(users).name,
    created_by: faker.helpers.arrayElement(users).name,
}));

fs.writeFileSync(path.join(__dirname, 'tasks.json'), JSON.stringify(tasks, null, 2));

console.log('✅ Tasks data generated.');
