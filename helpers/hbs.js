module.exports=(hbs)=>{
    hbs.registerHelper('is_active', (index, number) => {
        return (index + 1) == number ? 'active' : '';
    });

    hbs.registerHelper('prev_link', (pagination) => {
        return pagination.href(true);
    });

    hbs.registerHelper('next_link', (pagination) => {
        return pagination.href();
    });

    hbs.registerHelper('has_next_links', (pageCount, pagination, options) => {
        if(pagination.hasNextPages(pageCount)) {
            return options.fn(this);
        }
        else
        {
            return options.inverse(this);
        }
    })
}