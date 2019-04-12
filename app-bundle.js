!function(e){var r={};function t(o){if(r[o])return r[o].exports;var n=r[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,t),n.l=!0,n.exports}t.m=e,t.c=r,t.d=function(e,r,o){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)t.d(o,n,function(r){return e[r]}.bind(null,n));return o},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=9)}([function(e,r,t){"use strict";var o,n=t(2),a=(o=n)&&o.__esModule?o:{default:o};var s=new a.default.Schema({name:String,image:String,description:String,location:String,lat:Number,lng:Number,price:String,createdAt:{type:Date,default:Date.now},author:{id:{type:a.default.Schema.Types.ObjectId,ref:"User"},username:String},comments:[{type:a.default.Schema.Types.ObjectId,ref:"Comment"}]});e.exports=a.default.model("Campground",s)},function(e,r){e.exports=require("express")},function(e,r){e.exports=require("mongoose")},function(e,r){e.exports=require("dotenv")},function(e,r,t){"use strict";var o,n=t(2),a=(o=n)&&o.__esModule?o:{default:o};var s=a.default.Schema({text:String,createdAt:{type:Date,default:Date.now},author:{id:{type:a.default.Schema.Types.ObjectId,ref:"User"},username:String}});e.exports=a.default.model("Comment",s)},function(e,r){e.exports=require("passport")},function(e,r,t){"use strict";var o=a(t(2)),n=a(t(18));function a(e){return e&&e.__esModule?e:{default:e}}var s=new o.default.Schema({username:{type:String,unique:!0,required:!0},picture:String,email:{type:String,unique:!0,required:!0},password:String,resetPasswordToken:String,resetPasswordExpires:Date,isAdmin:{type:Boolean,default:!1}});s.plugin(n.default),e.exports=o.default.model("User",s)},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.checkLogin=r.checkCommentOwnership=r.checkCampgroundOwnership=void 0;var o=a(t(0)),n=a(t(4));function a(e){return e&&e.__esModule?e:{default:e}}r.checkCampgroundOwnership=function(e,r,t){e.isAuthenticated()?o.default.findById(e.params.id,function(o,n){o||!n?(console.log(o),e.flash("error","Campground not found"),r.redirect("back")):n.author.id.equals(e.user._id)||e.user.isAdmin?t():(e.flash("error","You need to be the campground author to do that!"),r.redirect("back"))}):(e.flash("error","You need to be logged in to do that"),r.redirect("back"))},r.checkCommentOwnership=function(e,r,t){e.isAuthenticated()?n.default.findById(e.params.comment_id,function(o,n){o||!n?(console.log(o),e.flash("error","Comment not found"),r.redirect("back")):n.author.id.equals(e.user._id)||e.user.isAdmin?t():(e.flash("error","You need to be the comment author to do that!"),r.redirect("back"))}):(e.flash("error","You need to be logged in to do that"),r.redirect("back"))},r.checkLogin=function(e,r,t){if(e.isAuthenticated())return t();e.flash("error","You need to be logged in to do that"),r.redirect("/login")}},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.imageStore=r.uploadConfig=void 0;var o=a(t(26)),n=a(t(27));function a(e){return e&&e.__esModule?e:{default:e}}var s,i,u=function(e,r,t){if(!r.originalname.match(/\.(jpg|jpeg|png|gif)$/i))return t(new Error("Only image files (jpg, jpeg, png or gif) are allowed!"),!1);t(null,!0)},c=(s=regeneratorRuntime.mark(function e(r,t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:(0,n.default)(r.file.path).jpeg({quality:80}).resize(1200).toFile("images/campgrounds/"+r.file.filename+"-large.jpg",function(e){if(e)return r.flash("error","Could not store image file"),console.log(e),t.redirect("back")});case 1:case"end":return e.stop()}},e,void 0)}),i=function(){var e=s.apply(this,arguments);return new Promise(function(r,t){return function o(n,a){try{var s=e[n](a),i=s.value}catch(e){return void t(e)}if(!s.done)return Promise.resolve(i).then(function(e){o("next",e)},function(e){o("throw",e)});r(i)}("next")})},function(e,r){return i.apply(this,arguments)});r.uploadConfig=function(){var e=o.default.diskStorage({filename:function(e,r,t){t(null,Date.now()+r.originalname)}});return(0,o.default)({storage:e,fileFilter:u})},r.imageStore=c},function(e,r,t){t(10),e.exports=t(11)},function(e,r){e.exports=require("babel-polyfill")},function(e,r,t){"use strict";var o=v(t(3)),n=v(t(1)),a=v(t(12)),s=v(t(13)),i=v(t(2)),u=v(t(5)),c=v(t(14)),d=v(t(15)),l=v(t(16)),f=v(t(17)),m=(v(t(0)),v(t(4)),v(t(6))),p=v(t(19)),g=v(t(21)),h=v(t(28));function v(e){return e&&e.__esModule?e:{default:e}}o.default.config();var w=(0,n.default)();i.default.set("useCreateIndex",!0),i.default.set("useFindAndModify",!1);var y=process.env.DATABASEURL||"mongodb://localhost/yelp_camp";i.default.connect(y,{useNewUrlParser:!0}),w.use(s.default.urlencoded({extended:!0})),w.set("view engine","ejs"),w.use((0,d.default)("_method")),w.use(n.default.static(__dirname+"/public")),w.use("/images",n.default.static(__dirname+"/images")),w.use((0,l.default)()),w.locals.moment=f.default,w.use((0,a.default)({secret:"Once again, Rusty wins cutest dog!",resave:!1,saveUninitialized:!1})),w.use(u.default.initialize()),w.use(u.default.session()),u.default.use(new c.default(m.default.authenticate())),u.default.serializeUser(m.default.serializeUser()),u.default.deserializeUser(m.default.deserializeUser()),w.use(function(e,r,t){r.locals.currentUser=e.user,r.locals.error=e.flash("error"),r.locals.success=e.flash("success"),t()}),w.use(h.default),w.use("/campgrounds",g.default),w.use("/campgrounds/:id/comments",p.default),w.listen(process.env.PORT||3e3,function(){console.log("YelpCamp server started!")})},function(e,r){e.exports=require("express-session")},function(e,r){e.exports=require("body-parser")},function(e,r){e.exports=require("passport-local")},function(e,r){e.exports=require("method-override")},function(e,r){e.exports=require("connect-flash")},function(e,r){e.exports=require("moment")},function(e,r){e.exports=require("passport-local-mongoose")},function(e,r,t){"use strict";var o,n=t(1),a=(o=n)&&o.__esModule?o:{default:o},s=t(20),i=t(7);var u=a.default.Router({mergeParams:!0});u.get("/new",i.checkLogin,function(e,r){(0,s.showCommentForm)(e,r)}),u.post("/",i.checkLogin,function(e,r){(0,s.createComment)(e,r)}),u.get("/:comment_id/edit",i.checkCommentOwnership,function(e,r){(0,s.showEditForm)(e,r)}),u.put("/:comment_id",i.checkCommentOwnership,function(e,r){(0,s.updateComment)(e,r)}),u.delete("/:comment_id",i.checkCommentOwnership,function(e,r){(0,s.deleteComment)(e,r)}),e.exports=u},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.showEditForm=r.deleteComment=r.updateComment=r.createComment=r.showCommentForm=void 0;var o=a(t(0)),n=a(t(4));function a(e){return e&&e.__esModule?e:{default:e}}r.showCommentForm=function(e,r){o.default.findById(e.params.id,function(e,t){e?(console.log("Could not find the campground to write a new comment"),console.log(e)):r.render("comments/new",{campground:t})})},r.createComment=function(e,r){o.default.findById(e.params.id,function(t,o){if(t)e.flash("error","Could not find the campground"),console.log(t),r.redirect("/campgrounds");else{var a={author:{id:e.user._id,username:e.user.username},text:e.body.text};n.default.create(a,function(t,n){t?(e.flash("error","Could not add the comment"),console.log(t)):(o.comments.push(n),o.save(),e.flash("success","New comment addded successfully"),console.log(n),r.redirect("/campgrounds/"+o._id))})}})},r.updateComment=function(e,r){n.default.findByIdAndUpdate(e.params.comment_id,e.body.comment,function(t,o){t?(e.flash("error","Could not update the comment"),console.log(t),r.redirect("back")):(e.flash("success","Comment edited successfully"),r.redirect("/campgrounds/"+e.params.id))})},r.deleteComment=function(e,r){n.default.findByIdAndRemove(e.params.comment_id,function(t,o){t?(e.flash("error","Could not delete the comment"),console.log(t),r.redirect("back")):(e.flash("success","Comment deleted successfully"),r.redirect("/campgrounds/"+e.params.id))})},r.showEditForm=function(e,r){o.default.findById(e.params.id,function(t,o){if(t||!o)return e.flash("error","Could not find the campground"),console.log(t),r.redirect("back");n.default.findById(e.params.comment_id,function(t,o){t?(e.flash("error","Could not find the comment"),console.log(t),r.redirect("back")):r.render("comments/edit",{campground_id:e.params.id,comment:o})})})}},function(e,r,t){"use strict";var o,n=t(1),a=(o=n)&&o.__esModule?o:{default:o},s=t(22),i=t(8),u=t(7);var c=a.default.Router();c.get("/",function(e,r){(0,s.showAllCamps)(e,r)}),c.get("/new",u.checkLogin,function(e,r){r.render("campgrounds/new")}),c.post("/",u.checkLogin,(0,i.uploadConfig)().single("image"),function(e,r){(0,s.createCamp)(e,r)}),c.get("/:id/edit",u.checkCampgroundOwnership,function(e,r){(0,s.showEditCamp)(e,r)}),c.put("/:id",u.checkCampgroundOwnership,(0,i.uploadConfig)().single("image"),function(e,r){(0,s.updateCamp)(e,r)}),c.delete("/:id",u.checkCampgroundOwnership,function(e,r){(0,s.deleteCamp)(e,r)}),c.get("/:id",function(e,r){(0,s.showCampDetails)(e,r)}),e.exports=c},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.showCampDetails=r.deleteCamp=r.updateCamp=r.showEditCamp=r.createCamp=r.showAllCamps=void 0;var o=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},n=u(t(0)),a=u(t(23)),s=t(24),i=t(8);function u(e){return e&&e.__esModule?e:{default:e}}function c(e){return function(){var r=e.apply(this,arguments);return new Promise(function(e,t){return function o(n,a){try{var s=r[n](a),i=s.value}catch(e){return void t(e)}if(!s.done)return Promise.resolve(i).then(function(e){o("next",e)},function(e){o("throw",e)});e(i)}("next")})}}var d,l,f,m=(d=c(regeneratorRuntime.mark(function e(r,t){var a,u,c;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(0,i.imageStore)(r,t),a=r.file.filename+"-large.jpg",e.next=4,(0,s.locateCamp)(r,t);case 4:u=e.sent,c=o({name:r.body.name,image:a,price:r.body.price,description:r.body.description,author:{id:r.user._id,username:r.user.username}},u),n.default.create(c,function(e,o){if(e)return r.flash("error","Could not create the campground"),console.log(e),t.redirect("back");r.flash("success","Campground created successfully"),console.log(o),t.redirect("/campgrounds")});case 7:case"end":return e.stop()}},e,void 0)})),function(e,r){return d.apply(this,arguments)}),p=(l=c(regeneratorRuntime.mark(function e(r,t){var u,c,d;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return u=void 0,e.next=3,n.default.findById(r.params.id,function(e,o){e?(r.flash("error","Could not find the campground"),console.log(e),t.redirect("/campgrounds")):u=o.image});case 3:return r.file&&((0,i.imageStore)(r,t),a.default.unlink("images/campgrounds/"+u,function(e){e?(console.log(e),u=r.file.filename+"-large.jpg"):u=r.file.filename+"-large.jpg"})),e.next=6,(0,s.locateCamp)(r,t);case 6:c=e.sent,d=o({name:r.body.name,image:u,price:r.body.price,description:r.body.description},c),n.default.findByIdAndUpdate(r.params.id,d,function(e,o){e?(r.flash("error","Could not update the campground"),console.log(e),t.redirect("/campgrounds")):(r.flash("success","Campground edited successfully"),t.redirect("/campgrounds/"+r.params.id))});case 9:case"end":return e.stop()}},e,void 0)})),function(e,r){return l.apply(this,arguments)}),g=(f=c(regeneratorRuntime.mark(function e(r,t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.default.findById(r.params.id,function(e,r){a.default.unlink("images/campgrounds/"+r.image,function(e){e&&console.log(e)})});case 2:n.default.findByIdAndRemove(r.params.id,function(e){e?(r.flash("error","Could not delete the campground"),console.log(e),t.redirect("/campgrounds")):(r.flash("success","Campground deleted successfully"),t.redirect("/campgrounds"))});case 3:case"end":return e.stop()}},e,void 0)})),function(e,r){return f.apply(this,arguments)}),h=function(e){return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")};r.showAllCamps=function(e,r){if(e.query.search){var t=new RegExp(h(e.query.search),"gi");n.default.find({name:t},function(t,o){t?(e.flash("error","Could not load the campground database"),console.log(t)):o.length<1?(e.flash("error","No campgrounds match that query, please try again"),r.redirect("campgrounds/index")):r.render("campgrounds/index",{campgrounds:o,page:"campgrounds"})})}else n.default.find({},function(t,o){t?(e.flash("error","Could not load the campground database"),console.log(t)):r.render("campgrounds/index",{campgrounds:o,page:"campgrounds"})})},r.createCamp=m,r.showEditCamp=function(e,r){n.default.findById(e.params.id,function(t,o){t?(e.flash("error","Could not find the campground"),console.log(t),r.redirect("back")):r.render("campgrounds/edit",{campground:o})})},r.updateCamp=p,r.deleteCamp=g,r.showCampDetails=function(e,r){n.default.findById(e.params.id).populate("comments").exec(function(t,o){t||!o?(e.flash("error","Could not find the campground"),console.log(t),r.redirect("back")):r.render("campgrounds/show",{campground:o})})}},function(e,r){e.exports=require("fs")},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.locateCamp=void 0;var o=a(t(25)),n=a(t(3));function a(e){return e&&e.__esModule?e:{default:e}}r.locateCamp=function(e,r){var t=function(){n.default.config();var e={provider:"google",httpAdapter:"https",apiKey:process.env.GEOCODER_API_KEY,formatter:null};return(0,o.default)(e)}();return new Promise(function(o,n){t.geocode(e.body.location,function(t,a){t||!a.length?(e.flash("error","Address not found"),console.log(t),n(r.redirect("back"))):o({lat:a[0].latitude,lng:a[0].longitude,location:a[0].formattedAddress})})})}},function(e,r){e.exports=require("node-geocoder")},function(e,r){e.exports=require("multer")},function(e,r){e.exports=require("sharp")},function(e,r,t){"use strict";var o,n=t(1),a=(o=n)&&o.__esModule?o:{default:o},s=t(29);var i=a.default.Router();i.get("/",function(e,r){r.render("landing")}),i.get("/register",function(e,r){r.render("register",{page:"register"})}),i.post("/register",function(e,r){(0,s.registerUser)(e,r)}),i.get("/login",function(e,r){r.render("login",{page:"login"})}),i.post("/login",function(e,r,t){(0,s.login)(e,r,t)}),i.get("/logout",function(e,r){(0,s.logout)(e,r)}),i.get("/forgot",function(e,r){r.render("forgot")}),i.post("/forgot",function(e,r,t){(0,s.forgotPassword)(e,r,t)}),i.get("/reset/:token",function(e,r){(0,s.checkTokenAndRender)(e,r)}),i.post("/reset/:token",function(e,r){(0,s.resetPassword)(e,r)}),i.get("/users/:id",function(e,r){(0,s.showUserProfile)(e,r)}),e.exports=i},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.showUserProfile=r.resetPassword=r.checkTokenAndRender=r.forgotPassword=r.logout=r.login=r.registerUser=void 0;var o=c(t(3)),n=c(t(0)),a=c(t(6)),s=c(t(5)),i=c(t(30)),u=c(t(31));function c(e){return e&&e.__esModule?e:{default:e}}function d(e){return function(){var r=e.apply(this,arguments);return new Promise(function(e,t){return function o(n,a){try{var s=r[n](a),i=s.value}catch(e){return void t(e)}if(!s.done)return Promise.resolve(i).then(function(e){o("next",e)},function(e){o("throw",e)});e(i)}("next")})}}var l,f,m=(l=d(regeneratorRuntime.mark(function e(r,t){var n,s,c;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return o.default.config(),n=void 0,e.next=4,u.default.randomBytes(20,function(e,t){e?(r.flash("error","Could not generate validation token"),console.log(e)):n=t.toString("hex")});case 4:return s=void 0,e.next=7,a.default.findOne({email:r.body.email},function(e,t){e?(r.flash("error","Could not access database"),console.log(e)):t?(t.resetPasswordToken=n,t.resetPasswordExpires=Date.now()+18e4,t.save(),s=t):r.flash("error","No account with that email address exists.")});case 7:try{c={to:s.email,subject:"YelpCamp Password Reset",text:"You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\nhttp://"+r.headers.host+"/reset/"+n+"\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n"},i.default.createTransport({service:"Gmail",auth:{user:"ricardovalenca@gmail.com",pass:process.env.GMAILPW}}).sendMail(c,function(e){e?(r.flash("error","Could not send email"),console.log(e)):(r.flash("success","An email has been sent to "+s.email+" with further instructions."),console.log("Email sent to user ID: "+s._id),t.redirect("/forgot"))})}catch(e){console.log("Could not complete the process to retrieve the password"),t.redirect("/forgot")}case 8:case"end":return e.stop()}},e,void 0)})),function(e,r){return l.apply(this,arguments)}),p=(f=d(regeneratorRuntime.mark(function e(r,t){var n,s;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return o.default.config(),n=void 0,e.next=4,a.default.findOne({resetPasswordToken:r.params.token,resetPasswordExpires:{$gt:Date.now()}},function(e,t){t||r.flash("error","Password reset token is invalid or has expired."),r.body.password===r.body.confirm?(n=t,t.setPassword(r.body.password,function(e){t.resetPasswordToken=void 0,t.resetPasswordExpires=void 0,t.save(function(e){r.logIn(t,function(e){console.log("Password changed for user ID: "+t._id)})})})):r.flash("error","Passwords do not match.")});case 4:try{s={to:n.email,from:"ricardovalenca@gmail.com",subject:"Your password has been changed",text:"Hello,\n\nThis is a confirmation that the password for your account "+n.email+" has just been changed.\n"},i.default.createTransport({service:"Gmail",auth:{user:"ricardovalenca@gmail.com",pass:process.env.GMAILPW}}).sendMail(s,function(e){e?console.log(e):(r.flash("success","Success! Your password has been changed."),t.redirect("/campgrounds"))})}catch(e){console.log("Could not complete the process to reset the password"),t.redirect("back")}case 5:case"end":return e.stop()}},e,void 0)})),function(e,r){return f.apply(this,arguments)});r.registerUser=function(e,r){var t=new a.default({username:e.body.username,picture:e.body.picture,email:e.body.email});"secretcode"===e.body.adminCode&&(t.isAdmin=!0),a.default.register(t,e.body.password,function(t,o){if(t)return e.flash("error","Could not register user"),console.log(t),r.redirect("/register");s.default.authenticate("local")(e,r,function(){e.flash("success","Welcome to YelpCamp "+o.username),r.redirect("/campgrounds")})})},r.login=function(e,r,t){s.default.authenticate("local",function(o,n,a){if(o||!n)return e.flash("error","User doesn't exist or password is incorrect"),r.redirect("/login");e.logIn(n,function(o){return o?(e.flash("error","Could not log in"),console.log(o),r.redirect("/login"),t(o)):(e.flash("success","Welcome back, "+n.username),r.redirect("/campgrounds"))})})(e,r,t)},r.logout=function(e,r){e.logout(),e.flash("success","Logged you out!"),r.redirect("/campgrounds")},r.forgotPassword=m,r.checkTokenAndRender=function(e,r){a.default.findOne({resetPasswordToken:e.params.token,resetPasswordExpires:{$gt:Date.now()}},function(t,o){if(!o)return e.flash("error","Password reset token is invalid or has expired."),r.redirect("/forgot");r.render("reset",{token:e.params.token})})},r.resetPassword=p,r.showUserProfile=function(e,r){a.default.findById(e.params.id,function(t,o){t?(e.flash("error","Could not find the user"),console.log(t),r.redirect("/")):n.default.find().where("author.id").equals(o._id).exec(function(t,n){t?(e.flash("error","Could not find the campgrounds created by this user"),console.log(t)):r.render("users/show",{user:o,campgrounds:n})})})}},function(e,r){e.exports=require("nodemailer")},function(e,r){e.exports=require("crypto")}]);