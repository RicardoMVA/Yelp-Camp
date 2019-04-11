!function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=11)}([function(e,r,t){"use strict";var n,o=t(2),a=(n=o)&&n.__esModule?n:{default:n};var i=new a.default.Schema({name:String,image:String,description:String,location:String,lat:Number,lng:Number,price:String,createdAt:{type:Date,default:Date.now},author:{id:{type:a.default.Schema.Types.ObjectId,ref:"User"},username:String},comments:[{type:a.default.Schema.Types.ObjectId,ref:"Comment"}]});e.exports=a.default.model("Campground",i)},function(e,r){e.exports=require("express")},function(e,r){e.exports=require("mongoose")},function(e,r,t){"use strict";var n,o=t(2),a=(n=o)&&n.__esModule?n:{default:n};var i=a.default.Schema({text:String,createdAt:{type:Date,default:Date.now},author:{id:{type:a.default.Schema.Types.ObjectId,ref:"User"},username:String}});e.exports=a.default.model("Comment",i)},function(e,r){e.exports=require("dotenv")},function(e,r){e.exports=require("passport")},function(e,r,t){"use strict";var n=a(t(2)),o=a(t(20));function a(e){return e&&e.__esModule?e:{default:e}}var i=new n.default.Schema({username:{type:String,unique:!0,required:!0},picture:String,email:{type:String,unique:!0,required:!0},password:String,resetPasswordToken:String,resetPasswordExpires:Date,isAdmin:{type:Boolean,default:!1}});i.plugin(o.default),e.exports=n.default.model("User",i)},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.checkLogin=r.checkCommentOwnership=r.checkCampgroundOwnership=void 0;var n=a(t(0)),o=a(t(3));function a(e){return e&&e.__esModule?e:{default:e}}r.checkCampgroundOwnership=function(e,r,t){e.isAuthenticated()?n.default.findById(e.params.id,function(n,o){n||!o?(console.log(n),e.flash("error","Campground not found"),r.redirect("back")):o.author.id.equals(e.user._id)||e.user.isAdmin?t():(e.flash("error","You need to be the campground author to do that!"),r.redirect("back"))}):(e.flash("error","You need to be logged in to do that"),r.redirect("back"))},r.checkCommentOwnership=function(e,r,t){e.isAuthenticated()?o.default.findById(e.params.comment_id,function(n,o){n||!o?(console.log(n),e.flash("error","Comment not found"),r.redirect("back")):o.author.id.equals(e.user._id)||e.user.isAdmin?t():(e.flash("error","You need to be the comment author to do that!"),r.redirect("back"))}):(e.flash("error","You need to be logged in to do that"),r.redirect("back"))},r.checkLogin=function(e,r,t){if(e.isAuthenticated())return t();e.flash("error","You need to be logged in to do that"),r.redirect("/login")}},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.imageStore=r.uploadConfig=void 0;var n=a(t(28)),o=a(t(29));function a(e){return e&&e.__esModule?e:{default:e}}var i,u,s=function(e,r,t){if(!r.originalname.match(/\.(jpg|jpeg|png|gif)$/i))return t(new Error("Only image files (jpg, jpeg, png or gif) are allowed!"),!1);t(null,!0)},c=(i=regeneratorRuntime.mark(function e(r,t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:(0,o.default)(r.file.path).jpeg({quality:80}).resize(1200).toFile("images/campgrounds/"+r.file.filename+"-large.jpg",function(e){if(e)return r.flash("error","Could not store image file"),console.log(e),t.redirect("back")});case 1:case"end":return e.stop()}},e,void 0)}),u=function(){var e=i.apply(this,arguments);return new Promise(function(r,t){return function n(o,a){try{var i=e[o](a),u=i.value}catch(e){return void t(e)}if(!i.done)return Promise.resolve(u).then(function(e){n("next",e)},function(e){n("throw",e)});r(u)}("next")})},function(e,r){return u.apply(this,arguments)});r.uploadConfig=function(){var e=n.default.diskStorage({filename:function(e,r,t){t(null,Date.now()+r.originalname)}});return(0,n.default)({storage:e,fileFilter:s})},r.imageStore=c},function(e,r){e.exports=require("async")},function(e,r){e.exports=require("nodemailer")},function(e,r,t){t(12),e.exports=t(13)},function(e,r){e.exports=require("babel-polyfill")},function(e,r,t){"use strict";var n=v(t(4)),o=v(t(1)),a=v(t(14)),i=v(t(15)),u=v(t(2)),s=v(t(5)),c=v(t(16)),d=v(t(17)),l=v(t(18)),f=v(t(19)),m=(v(t(0)),v(t(3)),v(t(6))),p=v(t(21)),g=v(t(23)),h=v(t(30));function v(e){return e&&e.__esModule?e:{default:e}}n.default.config();var y=(0,o.default)();u.default.set("useCreateIndex",!0),u.default.set("useFindAndModify",!1);var w=process.env.DATABASEURL||"mongodb://localhost/yelp_camp";u.default.connect(w,{useNewUrlParser:!0}),y.use(i.default.urlencoded({extended:!0})),y.set("view engine","ejs"),y.use((0,d.default)("_method")),y.use(o.default.static(__dirname+"/public")),y.use("/images",o.default.static(__dirname+"/images")),y.use((0,l.default)()),y.locals.moment=f.default,y.use((0,a.default)({secret:"Once again, Rusty wins cutest dog!",resave:!1,saveUninitialized:!1})),y.use(s.default.initialize()),y.use(s.default.session()),s.default.use(new c.default(m.default.authenticate())),s.default.serializeUser(m.default.serializeUser()),s.default.deserializeUser(m.default.deserializeUser()),y.use(function(e,r,t){r.locals.currentUser=e.user,r.locals.error=e.flash("error"),r.locals.success=e.flash("success"),t()}),y.use(h.default),y.use("/campgrounds",g.default),y.use("/campgrounds/:id/comments",p.default),y.listen(process.env.PORT||3e3,function(){console.log("YelpCamp server started!")})},function(e,r){e.exports=require("express-session")},function(e,r){e.exports=require("body-parser")},function(e,r){e.exports=require("passport-local")},function(e,r){e.exports=require("method-override")},function(e,r){e.exports=require("connect-flash")},function(e,r){e.exports=require("moment")},function(e,r){e.exports=require("passport-local-mongoose")},function(e,r,t){"use strict";var n=u(t(1)),o=u(t(0)),a=(u(t(3)),t(22)),i=t(7);function u(e){return e&&e.__esModule?e:{default:e}}var s=n.default.Router({mergeParams:!0});s.get("/new",i.checkLogin,function(e,r){o.default.findById(e.params.id,function(e,t){e?(console.log("Could not find the campground to write a new comment"),console.log(e)):r.render("comments/new",{campground:t})})}),s.post("/",i.checkLogin,function(e,r){(0,a.createComment)(e,r)}),s.get("/:comment_id/edit",i.checkCommentOwnership,function(e,r){(0,a.showEditForm)(e,r)}),s.put("/:comment_id",i.checkCommentOwnership,function(e,r){(0,a.updateComment)(e,r)}),s.delete("/:comment_id",i.checkCommentOwnership,function(e,r){(0,a.deleteComment)(e,r)}),e.exports=s},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.showEditForm=r.deleteComment=r.updateComment=r.createComment=void 0;var n=a(t(0)),o=a(t(3));function a(e){return e&&e.__esModule?e:{default:e}}r.createComment=function(e,r){n.default.findById(e.params.id,function(t,n){if(t)e.flash("error","Could not find the campground"),console.log(t),r.redirect("/campgrounds");else{var a={author:{id:e.user._id,username:e.user.username},text:e.body.text};o.default.create(a,function(t,o){t?(e.flash("error","Could not add the comment"),console.log(t)):(n.comments.push(o),n.save(),e.flash("success","New comment addded successfully"),console.log(o),r.redirect("/campgrounds/"+n._id))})}})},r.updateComment=function(e,r){o.default.findByIdAndUpdate(e.params.comment_id,e.body.comment,function(t,n){t?(e.flash("error","Could not update the comment"),console.log(t),r.redirect("back")):(e.flash("success","Comment edited successfully"),r.redirect("/campgrounds/"+e.params.id))})},r.deleteComment=function(e,r){o.default.findByIdAndRemove(e.params.comment_id,function(t,n){t?(e.flash("error","Could not delete the comment"),console.log(t),r.redirect("back")):(e.flash("success","Comment deleted successfully"),r.redirect("/campgrounds/"+e.params.id))})},r.showEditForm=function(e,r){n.default.findById(e.params.id,function(t,n){if(t||!n)return e.flash("error","Could not find the campground"),console.log(t),r.redirect("back");o.default.findById(e.params.comment_id,function(t,n){t?(e.flash("error","Could not find the comment"),console.log(t),r.redirect("back")):r.render("comments/edit",{campground_id:e.params.id,comment:n})})})}},function(e,r,t){"use strict";var n=s(t(1)),o=s(t(0)),a=t(24),i=t(8),u=t(7);function s(e){return e&&e.__esModule?e:{default:e}}var c=n.default.Router();c.get("/",function(e,r){(0,a.showAllCamps)(e,r)}),c.get("/new",u.checkLogin,function(e,r){r.render("campgrounds/new")}),c.post("/",u.checkLogin,(0,i.uploadConfig)().single("image"),function(e,r){(0,a.createCamp)(e,r)}),c.get("/:id/edit",u.checkCampgroundOwnership,function(e,r){o.default.findById(e.params.id,function(t,n){t?(e.flash("error","Could not find the campground"),console.log(t),r.redirect("back")):r.render("campgrounds/edit",{campground:n})})}),c.put("/:id",u.checkCampgroundOwnership,(0,i.uploadConfig)().single("image"),function(e,r){(0,a.updateCamp)(e,r)}),c.delete("/:id",u.checkCampgroundOwnership,function(e,r){(0,a.deleteCamp)(e,r)}),c.get("/:id",function(e,r){o.default.findById(e.params.id).populate("comments").exec(function(t,n){t||!n?(e.flash("error","Could not find the campground"),console.log(t),r.redirect("back")):r.render("campgrounds/show",{campground:n})})}),e.exports=c},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.showAllCamps=r.deleteCamp=r.updateCamp=r.createCamp=void 0;var n=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},o=s(t(0)),a=s(t(25)),i=t(26),u=t(8);function s(e){return e&&e.__esModule?e:{default:e}}function c(e){return function(){var r=e.apply(this,arguments);return new Promise(function(e,t){return function n(o,a){try{var i=r[o](a),u=i.value}catch(e){return void t(e)}if(!i.done)return Promise.resolve(u).then(function(e){n("next",e)},function(e){n("throw",e)});e(u)}("next")})}}var d,l,f,m=(d=c(regeneratorRuntime.mark(function e(r,t){var a,s,c;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(0,u.imageStore)(r,t),a=r.file.filename+"-large.jpg",e.next=4,(0,i.locateCamp)(r,t);case 4:s=e.sent,c=n({name:r.body.name,image:a,price:r.body.price,description:r.body.description,author:{id:r.user._id,username:r.user.username}},s),o.default.create(c,function(e,n){if(e)return r.flash("error","Could not create the campground"),console.log(e),t.redirect("back");r.flash("success","Campground created successfully"),console.log(n),t.redirect("/campgrounds")});case 7:case"end":return e.stop()}},e,void 0)})),function(e,r){return d.apply(this,arguments)}),p=(l=c(regeneratorRuntime.mark(function e(r,t){var s,c,d;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return s=void 0,e.next=3,o.default.findById(r.params.id,function(e,n){e?(r.flash("error","Could not find the campground"),console.log(e),t.redirect("/campgrounds")):s=n.image});case 3:return r.file&&((0,u.imageStore)(r,t),a.default.unlink("images/campgrounds/"+s,function(e){e?(console.log(e),s=r.file.filename+"-large.jpg"):s=r.file.filename+"-large.jpg"})),e.next=6,(0,i.locateCamp)(r,t);case 6:c=e.sent,d=n({name:r.body.name,image:s,price:r.body.price,description:r.body.description},c),o.default.findByIdAndUpdate(r.params.id,d,function(e,n){e?(r.flash("error","Could not update the campground"),console.log(e),t.redirect("/campgrounds")):(r.flash("success","Campground edited successfully"),t.redirect("/campgrounds/"+r.params.id))});case 9:case"end":return e.stop()}},e,void 0)})),function(e,r){return l.apply(this,arguments)}),g=(f=c(regeneratorRuntime.mark(function e(r,t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.default.findById(r.params.id,function(e,r){a.default.unlink("images/campgrounds/"+r.image,function(e){e&&console.log(e)})});case 2:o.default.findByIdAndRemove(r.params.id,function(e){e?(r.flash("error","Could not delete the campground"),console.log(e),t.redirect("/campgrounds")):(r.flash("success","Campground deleted successfully"),t.redirect("/campgrounds"))});case 3:case"end":return e.stop()}},e,void 0)})),function(e,r){return f.apply(this,arguments)}),h=function(e){return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")};r.createCamp=m,r.updateCamp=p,r.deleteCamp=g,r.showAllCamps=function(e,r){if(e.query.search){var t=new RegExp(h(e.query.search),"gi");o.default.find({name:t},function(t,n){t?(e.flash("error","Could not load the campground database"),console.log(t)):n.length<1?(e.flash("error","No campgrounds match that query, please try again"),r.redirect("campgrounds/index")):r.render("campgrounds/index",{campgrounds:n,page:"campgrounds"})})}else o.default.find({},function(t,n){t?(e.flash("error","Could not load the campground database"),console.log(t)):r.render("campgrounds/index",{campgrounds:n,page:"campgrounds"})})}},function(e,r){e.exports=require("fs")},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.locateCamp=void 0;var n=a(t(27)),o=a(t(4));function a(e){return e&&e.__esModule?e:{default:e}}r.locateCamp=function(e,r){var t=function(){o.default.config();var e={provider:"google",httpAdapter:"https",apiKey:process.env.GEOCODER_API_KEY,formatter:null};return(0,n.default)(e)}();return new Promise(function(n,o){t.geocode(e.body.location,function(t,a){t||!a.length?(e.flash("error","Address not found"),console.log(t),o(r.redirect("back"))):n({lat:a[0].latitude,lng:a[0].longitude,location:a[0].formattedAddress})})})}},function(e,r){e.exports=require("node-geocoder")},function(e,r){e.exports=require("multer")},function(e,r){e.exports=require("sharp")},function(e,r,t){"use strict";var n=d(t(4)),o=d(t(1)),a=(d(t(5)),d(t(9))),i=d(t(10)),u=t(31),s=d(t(0)),c=d(t(6));function d(e){return e&&e.__esModule?e:{default:e}}n.default.config();var l=o.default.Router();l.get("/",function(e,r){r.render("landing")}),l.get("/register",function(e,r){r.render("register",{page:"register"})}),l.post("/register",function(e,r){(0,u.registerUser)(e,r)}),l.get("/login",function(e,r){r.render("login",{page:"login"})}),l.post("/login",function(e,r,t){(0,u.login)(e,r,t)}),l.get("/logout",function(e,r){e.logout(),e.flash("success","Logged you out!"),r.redirect("/campgrounds")}),l.get("/forgot",function(e,r){r.render("forgot")}),l.post("/forgot",function(e,r,t){(0,u.forgotPassword)(e,r,t)}),l.get("/reset/:token",function(e,r){c.default.findOne({resetPasswordToken:e.params.token,resetPasswordExpires:{$gt:Date.now()}},function(t,n){if(!n)return e.flash("error","Password reset token is invalid or has expired."),r.redirect("/forgot");r.render("reset",{token:e.params.token})})}),l.post("/reset/:token",function(e,r){a.default.waterfall([function(t){c.default.findOne({resetPasswordToken:e.params.token,resetPasswordExpires:{$gt:Date.now()}},function(n,o){return o?e.body.password!==e.body.confirm?(e.flash("error","Passwords do not match."),r.redirect("back")):void o.setPassword(e.body.password,function(r){o.resetPasswordToken=void 0,o.resetPasswordExpires=void 0,o.save(function(r){e.logIn(o,function(e){t(e,o)})})}):(e.flash("error","Password reset token is invalid or has expired."),r.redirect("back"))})},function(r,t){var n=i.default.createTransport({service:"Gmail",auth:{user:"ricardovalenca@gmail.com",pass:process.env.GMAILPW}}),o={to:r.email,from:"ricardovalenca@gmail.com",subject:"Your password has been changed",text:"Hello,\n\nThis is a confirmation that the password for your account "+r.email+" has just been changed.\n"};n.sendMail(o,function(r){e.flash("success","Success! Your password has been changed."),t(r)})}],function(e){r.redirect("/campgrounds")})}),l.get("/users/:id",function(e,r){c.default.findById(e.params.id,function(t,n){t?(console.log(t),e.flash("error","Something went wrong finding the user"),r.redirect("/")):s.default.find().where("author.id").equals(n._id).exec(function(t,o){t?(console.log(t),e.flash("error","Something went wrong finding the campgrounds created by this user")):r.render("users/show",{user:n,campgrounds:o})})})}),e.exports=l},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.forgotPassword=r.login=r.registerUser=void 0;var n=s(t(6)),o=s(t(5)),a=s(t(9)),i=s(t(10)),u=s(t(32));function s(e){return e&&e.__esModule?e:{default:e}}function c(e){return function(){var r=e.apply(this,arguments);return new Promise(function(e,t){return function n(o,a){try{var i=r[o](a),u=i.value}catch(e){return void t(e)}if(!i.done)return Promise.resolve(u).then(function(e){n("next",e)},function(e){n("throw",e)});e(u)}("next")})}}var d,l,f,m=(d=c(regeneratorRuntime.mark(function e(r,t){var a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a=new n.default({username:r.body.username,picture:r.body.picture,email:r.body.email}),"secretcode"===r.body.adminCode&&(a.isAdmin=!0),n.default.register(a,r.body.password,function(e,n){if(e)return console.log(e),r.flash("error",e.message),t.redirect("/register");o.default.authenticate("local")(r,t,function(){r.flash("success","Welcome to YelpCamp "+n.username),t.redirect("/campgrounds")})});case 3:case"end":return e.stop()}},e,void 0)})),function(e,r){return d.apply(this,arguments)}),p=(l=c(regeneratorRuntime.mark(function e(r,t,n){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:o.default.authenticate("local",function(e,o,a){if(e||!o)return r.flash("error","User doesn't exist or password is incorrect"),t.redirect("/login");r.logIn(o,function(e){return e?(console.log(e),r.flash("error",e),t.redirect("/login"),n(e)):(r.flash("success","Welcome back, "+o.username),t.redirect("/campgrounds"))})})(r,t,n);case 1:case"end":return e.stop()}},e,void 0)})),function(e,r,t){return l.apply(this,arguments)}),g=(f=c(regeneratorRuntime.mark(function e(r,t,o){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a.default.waterfall([function(e){u.default.randomBytes(20,function(r,t){var n=t.toString("hex");e(r,n)})},function(e,o){n.default.findOne({email:r.body.email},function(n,a){if(!a)return r.flash("error","No account with that email address exists."),t.redirect("/forgot");a.resetPasswordToken=e,a.resetPasswordExpires=Date.now()+36e5,a.save(function(r){o(r,e,a)})})},function(e,t,n){var o=i.default.createTransport({service:"Gmail",auth:{user:"ricardovalenca@gmail.com",pass:process.env.GMAILPW}}),a={to:t.email,from:"ricardovalenca@gmail.com",subject:"YelpCamp Password Reset",text:"You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\nhttp://"+r.headers.host+"/reset/"+e+"\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n"};o.sendMail(a,function(e){console.log("change password email sent"),r.flash("success","An email has been sent to "+t.email+" with further instructions."),n(e,"done")})}],function(e){if(e)return o(e);t.redirect("/forgot")});case 1:case"end":return e.stop()}},e,void 0)})),function(e,r,t){return f.apply(this,arguments)});r.registerUser=m,r.login=p,r.forgotPassword=g},function(e,r){e.exports=require("crypto")}]);