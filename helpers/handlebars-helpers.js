const moment = require('moment');

module.exports = {
    select: function(selected, options){
        return options.fn(this).replace(new RegExp(' value=\"'+selected+'\"'), '$&selected="selected"');
    },

    generateDate: function(date, format){
        return moment(date).format(format);
    },

    featureList: function(features){
        let list = "";
        for(label in features){
            list+= `<div class="col-md-4 col-sm-6">
            <p><i class="fa fa-check-circle-o"></i> ${label}: ${features[label]}</p>
        </div>`;
        }
        return list;
    },

    pagination: function(path, page, prevPage, nextPage, totalPages, hasPrevPage, hasNextPage){
        let nav = "";

        if(hasPrevPage){
            nav+=`<a href="${path}/pagina/${prevPage}"><i class="fa fa-angle-left"></i></a>`;
            nav+=`<a href="${path}/pagina/${prevPage}">${prevPage}</a>`;
        }
        nav+=`<span>${page}</span>`;
        if(hasNextPage){
            nav+=`<a href="${path}/pagina/${nextPage}">${nextPage}</a>`;
            if(!(totalPages == nextPage)){
                nav+=`...&nbsp;&nbsp;&nbsp;&nbsp;`;
                nav+=`<a href="${path}/pagina/${totalPages}">${totalPages}</a>`;
            }
            nav+=`<a href="${path}/pagina/${nextPage}"><i class="fa fa-angle-right"></i></a>`;
        }
        return nav;
    },

    compare: function(alpha, bravo){
        return alpha === bravo ? true : false;
    }
};