export const getLists = () => {
    if (!localStorage.getItem('lists')) {
        localStorage.setItem(
            'lists',
            JSON.stringify([
                {
                    name: 'grocery list',
                    tasks: [
                        {
                            id: 0,
                            task: 'water',
                            done: false
                        }
                    ]
                }
            ])
        );
    }

    if (!localStorage.getItem('id')) {
        localStorage.setItem('id', 1);
    }

    return JSON.parse(localStorage.getItem('lists'));
};
