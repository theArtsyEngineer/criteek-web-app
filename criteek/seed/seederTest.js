var Post = require("../models/post");

var mongoose = require("mongoose");
mongoose.connect('localhost:27017/criteek');

var postCount = 1;

var posts = [
    new Post({
        title: 'Client Layouts',
        user: undefined,
        username: 'artsyEngineer',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        question: "So what now?",
        viewCt: 11,
        criteekCt: postCount,
        criteekDet:[{
            user : undefined,
            criteek : undefined
        }],
        imgPath:'http://image.shutterstock.com/z/stock-vector--business-web-ui-layout-template-modern-set-of-flat-website-template-design-metro-style-info-263654936.jpg',
        imgPathGFS: undefined,
        postDate: Date.now()
    }),
    
    new Post({
        title: 'Senior Portfolio 1',
        user: undefined,
        username: 'artsyEngineer',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        question: "So what now?",
        viewCt: 34,
        criteekCt: postCount,
        criteekDet:[{
            user : undefined,
            criteek : undefined
        }],
        imgPath:'http://kransan.com/wp-content/uploads/2015/05/smallsize1_new.jpg',
        imgPathGFS: undefined,
        postDate: Date.now()
    }),
    
    new Post({
        title: 'Re-Branding Project',
        user: undefined,
        username: 'artsyEngineer',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        question: "So what now?",
        viewCt: 15,
        criteekCt: postCount,
        criteekDet:[{
            user : undefined,
            criteek : undefined
        }],
        imgPath:'http://www.diamondflores.com/wp-content/uploads/2016/10/2016-08-25-1472147955-6786115-designheader.jpg',
        imgPathGFS: undefined,
        postDate: Date.now()
    }),
    
    new Post({
        title: 'Personal Layouts',
        user: undefined,
        username: 'artsyEngineer',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        question: "So what now?",
        viewCt: 15,
        criteekCt: postCount,
        criteekDet:[{
            user : undefined,
            criteek : undefined
        }],
        imgPath:'http://blog.orange.co.ke/wp-content/uploads/2015/09/Modern-Web-Design-Trends.jpg',
        imgPathGFS: undefined,
        postDate: Date.now()
    }),
    
    new Post({
        title: 'Startup Graphics',
        user: undefined,
        username: 'artsyEngineer',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        question: "So what now?",
        viewCt: 61,
        criteekCt: postCount,
        criteekDet:[{
            user : undefined,
            criteek : undefined
        }],
        imgPath:'http://graphic.design.umn.edu/data2/images/Unfold_GraphicBanner_908x443-01.png',
        imgPathGFS: undefined,
        postDate: Date.now()
    }),
    
    new Post({
        title: 'Client Layouts',
        user: undefined,
        username: 'artsyEngineer',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        question: "So what now?",
        viewCt: 77,
        criteekCt: postCount,
        criteekDet:[{
            user : undefined,
            criteek : undefined
        }],
        imgPath:'http://ideasaur.in/wp-content/uploads/2015/07/internship_2015_web_header.jpg',
        imgPathGFS: undefined,
        postDate: Date.now()
    }),
    
    new Post({
        title: 'New blog logo!!!',
        user: undefined,
        username: 'artsyEngineer',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        question: "So what now?",
        viewCt: 101,
        criteekCt: postCount,
        criteekDet:[{
            user : undefined,
            criteek : undefined
        }],
        imgPath:'http://img.elo7.com.br/product/original/135E5AA/condicionador-cabelos-cacheado-crespo-cosmeticos.jpg',
        imgPathGFS: undefined,
        postDate: Date.now()
    }),
    
    new Post({
        title: 'Resume sample 3',
        user: undefined,
        username: 'artsyEngineer',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        question: "So what now?",
        viewCt: 98,
        criteekCt: postCount,
        criteekDet:[{
            user : undefined,
            criteek : undefined
        }],
        imgPath:'http://design.lsu.edu/wp-content/uploads/2013/12/AshleyTrowelStudentWork.jpg',
        imgPathGFS: undefined,
        postDate: Date.now()
    }),
];

var done = 0;
for (var i = 0; i < posts.length; i++) {
    posts[i].save(function(err, result){
        done++;
        
        if (done == posts.length) {
            exit();
        }
    });
}

function exit (){
    mongoose.disconnect();    
}
