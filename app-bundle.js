!function(e){var r={};function n(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=r,n.d=function(e,r,t){n.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,r){if(1&r&&(e=n(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)n.d(t,o,function(r){return e[r]}.bind(null,o));return t},n.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(r,"a",r),r},n.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},n.p="",n(n.s=8)}([function(e,r,n){"use strict";var t,o=n(2),a=(t=o)&&t.__esModule?t:{default:t};var i=new a.default.Schema({name:String,image:String,description:String,location:String,lat:Number,lng:Number,price:String,createdAt:{type:Date,default:Date.now},author:{id:{type:a.default.Schema.Types.ObjectId,ref:"User"},username:String},comments:[{type:a.default.Schema.Types.ObjectId,ref:"Comment"}]});e.exports=a.default.model("Campground",i)},function(e,r){e.exports=require("express")},function(e,r){e.exports=require("mongoose")},function(e,r){e.exports=require("dotenv")},function(e,r,n){"use strict";var t,o=n(2),a=(t=o)&&t.__esModule?t:{default:t};var i=a.default.Schema({text:String,createdAt:{type:Date,default:Date.now},author:{id:{type:a.default.Schema.Types.ObjectId,ref:"User"},username:String}});e.exports=a.default.model("Comment",i)},function(e,r){e.exports=require("passport")},function(e,r,n){"use strict";var t=a(n(2)),o=a(n(17));function a(e){return e&&e.__esModule?e:{default:e}}var i=new t.default.Schema({username:{type:String,unique:!0,required:!0},picture:String,email:{type:String,unique:!0,required:!0},password:String,resetPasswordToken:String,resetPasswordExpires:Date,isAdmin:{type:Boolean,default:!1}});i.plugin(o.default),e.exports=t.default.model("User",i)},function(e,r,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.checkLogin=r.checkCommentOwnership=r.checkCampgroundOwnership=void 0;var t=a(n(0)),o=a(n(4));function a(e){return e&&e.__esModule?e:{default:e}}r.checkCampgroundOwnership=function(e,r,n){e.isAuthenticated()?t.default.findById(e.params.id,function(t,o){t||!o?(console.log(t),e.flash("error","Campground not found"),r.redirect("back")):o.author.id.equals(e.user._id)||e.user.isAdmin?n():(e.flash("error","You need to be the campground author to do that!"),r.redirect("back"))}):(e.flash("error","You need to be logged in to do that"),r.redirect("back"))},r.checkCommentOwnership=function(e,r,n){e.isAuthenticated()?o.default.findById(e.params.comment_id,function(t,o){t||!o?(console.log(t),e.flash("error","Comment not found"),r.redirect("back")):o.author.id.equals(e.user._id)||e.user.isAdmin?n():(e.flash("error","You need to be the comment author to do that!"),r.redirect("back"))}):(e.flash("error","You need to be logged in to do that"),r.redirect("back"))},r.checkLogin=function(e,r,n){if(e.isAuthenticated())return n();e.flash("error","You need to be logged in to do that"),r.redirect("/login")}},function(e,r,n){n(9),e.exports=n(10)},function(e,r){e.exports=require("babel-polyfill")},function(e,r,n){"use strict";var t=y(n(3)),o=y(n(1)),a=y(n(11)),i=y(n(12)),s=y(n(2)),u=y(n(5)),c=y(n(13)),d=y(n(14)),l=y(n(15)),f=y(n(16)),m=(y(n(0)),y(n(4)),y(n(6))),g=y(n(18)),p=y(n(19)),h=y(n(27));function y(e){return e&&e.__esModule?e:{default:e}}t.default.config();var w=(0,o.default)();s.default.set("useCreateIndex",!0),s.default.set("useFindAndModify",!1);var v=process.env.DATABASEURL||"mongodb://localhost/yelp_camp";s.default.connect(v,{useNewUrlParser:!0}),w.use(i.default.urlencoded({extended:!0})),w.set("view engine","ejs"),w.use((0,d.default)("_method")),w.use(o.default.static(__dirname+"/public")),w.use("/images",o.default.static(__dirname+"/images")),w.use((0,l.default)()),w.locals.moment=f.default,w.use((0,a.default)({secret:"Once again, Rusty wins cutest dog!",resave:!1,saveUninitialized:!1})),w.use(u.default.initialize()),w.use(u.default.session()),u.default.use(new c.default(m.default.authenticate())),u.default.serializeUser(m.default.serializeUser()),u.default.deserializeUser(m.default.deserializeUser()),w.use(function(e,r,n){r.locals.currentUser=e.user,r.locals.error=e.flash("error"),r.locals.success=e.flash("success"),n()}),w.use(h.default),w.use("/campgrounds",p.default),w.use("/campgrounds/:id/comments",g.default),w.listen(process.env.PORT||3e3,function(){console.log("YelpCamp server started!")})},function(e,r){e.exports=require("express-session")},function(e,r){e.exports=require("body-parser")},function(e,r){e.exports=require("passport-local")},function(e,r){e.exports=require("method-override")},function(e,r){e.exports=require("connect-flash")},function(e,r){e.exports=require("moment")},function(e,r){e.exports=require("passport-local-mongoose")},function(e,r,n){"use strict";var t=s(n(1)),o=s(n(0)),a=s(n(4)),i=n(7);function s(e){return e&&e.__esModule?e:{default:e}}var u=t.default.Router({mergeParams:!0});u.get("/new",i.checkLogin,function(e,r){o.default.findById(e.params.id,function(e,n){e?(console.log("Something went wrong when finding the ID to write a new comment"),console.log(e)):r.render("comments/new",{campground:n})})}),u.post("/",i.checkLogin,function(e,r){o.default.findById(e.params.id,function(n,t){n?(console.log("Something went wrong when adding a new comment"),console.log(n),r.redirect("/campgrounds")):a.default.create(e.body.comment,function(n,o){n?(e.flash("error","Something went wrong when adding the comment"),console.log(n)):(o.author.id=e.user._id,o.author.username=e.user.username,o.save(),t.comments.push(o),t.save(),e.flash("success","New comment addded successfully"),console.log(o),r.redirect("/campgrounds/"+t._id))})})}),u.get("/:comment_id/edit",i.checkCommentOwnership,function(e,r){o.default.findById(e.params.id,function(n,t){if(n||!t)return e.flash("error","Cannot find the campground"),r.redirect("back");a.default.findById(e.params.comment_id,function(n,t){n?(console.log(n),r.redirect("back")):r.render("comments/edit",{campground_id:e.params.id,comment:t})})})}),u.put("/:comment_id",i.checkCommentOwnership,function(e,r){a.default.findByIdAndUpdate(e.params.comment_id,e.body.comment,function(n,t){n?(console.log(n),r.redirect("back")):(e.flash("success","Comment edited successfully"),r.redirect("/campgrounds/"+e.params.id))})}),u.delete("/:comment_id",i.checkCommentOwnership,function(e,r){a.default.findByIdAndRemove(e.params.comment_id,function(n,t){n?(console.log(n),e.flash("error","Something went wrong when deleting the comment"),r.redirect("back")):(e.flash("success","Comment deleted successfully"),r.redirect("/campgrounds/"+e.params.id))})}),e.exports=u},function(e,r,n){"use strict";var t=c(n(1)),o=c(n(20)),a=c(n(21)),i=c(n(0)),s=n(22),u=n(7);function c(e){return e&&e.__esModule?e:{default:e}}var d=t.default.Router(),l=o.default.diskStorage({filename:function(e,r,n){n(null,Date.now()+r.originalname)}}),f=(0,o.default)({storage:l,fileFilter:function(e,r,n){if(!r.originalname.match(/\.(jpg|jpeg|png|gif)$/i))return n(new Error("Only image files (jpg, jpeg, png or gif) are allowed!"),!1);n(null,!0)}});d.get("/",function(e,r){if(e.query.search){var n=new RegExp(m(e.query.search),"gi");i.default.find({name:n},function(n,t){n?(console.log("Error loading the database"),console.log(n)):t.length<1?(e.flash("error","No campgrounds match that query, please try again"),r.redirect("campgrounds/index")):r.render("campgrounds/index",{campgrounds:t,page:"campgrounds"})})}else i.default.find({},function(e,n){e?(console.log("Error loading the database"),console.log(e)):r.render("campgrounds/index",{campgrounds:n,page:"campgrounds"})})}),d.get("/new",u.checkLogin,function(e,r){r.render("campgrounds/new")}),d.post("/",u.checkLogin,f.single("image"),function(e,r){(0,s.createCamp)(e,r)}),d.get("/:id/edit",u.checkCampgroundOwnership,function(e,r){i.default.findById(e.params.id,function(n,t){n?(console.log(n),e.flash("error","Address not found"),r.redirect("back")):r.render("campgrounds/edit",{campground:t})})}),d.put("/:id",u.checkCampgroundOwnership,f.single("image"),function(e,r){e.file?sharp(e.file.path).jpeg({quality:80}).resize(2400).toFile("images/campgrounds/"+e.file.filename+"-large.jpg",function(n,t){if(n)return e.flash("error","Could not load and optimize image file"),console.log(n),r.redirect("back");i.default.findById(e.params.id,function(n,t){a.default.unlink("images/campgrounds/"+t.image,function(n){console.log(n),console.log("images/campgrounds/"+t.image+" was deleted"),e.body.campground.image=e.file.filename+"-large.jpg",geocoder.geocode(e.body.location,function(n,t){if(n||!t.length)return e.flash("error",n),console.log(n),r.redirect("back");e.body.campground.lat=t[0].latitude,e.body.campground.lng=t[0].longitude,e.body.campground.location=t[0].formattedAddress,i.default.findByIdAndUpdate(e.params.id,e.body.campground,function(n,t){n?(console.log(n),e.flash("error",n.message),r.redirect("/campgrounds")):(e.flash("success","Campground edited successfully"),r.redirect("/campgrounds/"+e.params.id))})})})})}):geocoder.geocode(e.body.location,function(n,t){if(n||!t.length)return e.flash("error",n),console.log(n),r.redirect("back");e.body.campground.lat=t[0].latitude,e.body.campground.lng=t[0].longitude,e.body.campground.location=t[0].formattedAddress,i.default.findByIdAndUpdate(e.params.id,e.body.campground,function(n,t){n?(console.log(n),e.flash("error",n.message),r.redirect("/campgrounds")):(e.flash("success","Campground edited successfully"),r.redirect("/campgrounds/"+e.params.id))})})}),d.delete("/:id",u.checkCampgroundOwnership,function(e,r){i.default.findById(e.params.id,function(n,t){a.default.unlink("images/campgrounds/"+t.image,function(n){console.log(n),console.log("images/campgrounds/"+t.image+" was deleted"),i.default.findByIdAndRemove(e.params.id,function(n){n?(console.log(n),e.flash("error","Something went wrong when deleting the campground"),r.redirect("/campgrounds")):(e.flash("success","Campground deleted successfully"),r.redirect("/campgrounds"))})})})}),d.get("/:id",function(e,r){i.default.findById(e.params.id).populate("comments").exec(function(n,t){n||!t?(e.flash("error","Campground not found"),console.log(n),r.redirect("back")):r.render("campgrounds/show",{campground:t})})});var m=function(e){return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")};e.exports=d},function(e,r){e.exports=require("multer")},function(e,r){e.exports=require("fs")},function(e,r,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.createCamp=void 0;var t,o=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},a=n(0),i=(t=a)&&t.__esModule?t:{default:t},s=n(23),u=n(25);var c,d,l=(c=regeneratorRuntime.mark(function e(r,n){var t,a,c;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(0,u.imageStore)(r,n),t=r.file.filename+"-large.jpg",e.next=4,(0,s.locateCamp)(r,n);case 4:a=e.sent,c=o({name:r.body.name,image:t,price:r.body.price,description:r.body.description,author:{id:r.user._id,username:r.user.username}},a),i.default.create(c,function(e,t){if(e)return r.flash("error","Something went wrong when creating the campground"),console.log(e),n.redirect("back");r.flash("success","Campground created successfully"),console.log(t),n.redirect("/campgrounds")});case 7:case"end":return e.stop()}},e,void 0)}),d=function(){var e=c.apply(this,arguments);return new Promise(function(r,n){return function t(o,a){try{var i=e[o](a),s=i.value}catch(e){return void n(e)}if(!i.done)return Promise.resolve(s).then(function(e){t("next",e)},function(e){t("throw",e)});r(s)}("next")})},function(e,r){return d.apply(this,arguments)});r.createCamp=l},function(e,r,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.locateCamp=void 0;var t=a(n(24)),o=a(n(3));function a(e){return e&&e.__esModule?e:{default:e}}r.locateCamp=function(e,r){var n=function(){o.default.config();var e={provider:"google",httpAdapter:"https",apiKey:process.env.GEOCODER_API_KEY,formatter:null};return(0,t.default)(e)}();return new Promise(function(t,o){n.geocode(e.body.location,function(n,a){n||!a.length?(e.flash("error","Address not found"),console.log(n),o(r.redirect("back"))):t({lat:a[0].latitude,lng:a[0].longitude,location:a[0].formattedAddress})})})}},function(e,r){e.exports=require("node-geocoder")},function(e,r,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.imageStore=void 0;var t,o=n(26),a=(t=o)&&t.__esModule?t:{default:t};var i,s,u=(i=regeneratorRuntime.mark(function e(r,n){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:(0,a.default)(r.file.path).jpeg({quality:80}).resize(1200).toFile("images/campgrounds/"+r.file.filename+"-large.jpg",function(e){if(e)return r.flash("error","Could not store image file"),console.log(e),n.redirect("back")});case 1:case"end":return e.stop()}},e,void 0)}),s=function(){var e=i.apply(this,arguments);return new Promise(function(r,n){return function t(o,a){try{var i=e[o](a),s=i.value}catch(e){return void n(e)}if(!i.done)return Promise.resolve(s).then(function(e){t("next",e)},function(e){t("throw",e)});r(s)}("next")})},function(e,r){return s.apply(this,arguments)});r.imageStore=u},function(e,r){e.exports=require("sharp")},function(e,r,n){"use strict";var t=l(n(3)),o=l(n(1)),a=l(n(5)),i=l(n(28)),s=l(n(29)),u=l(n(30)),c=l(n(0)),d=l(n(6));function l(e){return e&&e.__esModule?e:{default:e}}t.default.config();var f=o.default.Router();f.get("/",function(e,r){r.render("landing")}),f.get("/register",function(e,r){r.render("register",{page:"register"})}),f.post("/register",function(e,r){var n=new d.default({username:e.body.username,picture:e.body.picture,email:e.body.email});"secretcode"===e.body.adminCode&&(n.isAdmin=!0),d.default.register(n,e.body.password,function(n,t){if(n)return console.log(n),e.flash("error",n.message),r.redirect("/register");a.default.authenticate("local")(e,r,function(){e.flash("success","Welcome to YelpCamp "+t.username),r.redirect("/campgrounds")})})}),f.get("/login",function(e,r){r.render("login",{page:"login"})}),f.post("/login",function(e,r,n){a.default.authenticate("local",function(t,o,a){if(t||!o)return e.flash("error","User doesn't exist or password is incorrect"),r.redirect("/login");e.logIn(o,function(t){return t?(console.log(t),e.flash("error",t),r.redirect("/login"),n(t)):(e.flash("success","Welcome back, "+o.username),r.redirect("/campgrounds"))})})(e,r,n)}),f.get("/logout",function(e,r){e.logout(),e.flash("success","Logged you out!"),r.redirect("/campgrounds")}),f.get("/forgot",function(e,r){r.render("forgot")}),f.post("/forgot",function(e,r,n){i.default.waterfall([function(e){u.default.randomBytes(20,function(r,n){var t=n.toString("hex");e(r,t)})},function(n,t){d.default.findOne({email:e.body.email},function(o,a){if(!a)return e.flash("error","No account with that email address exists."),r.redirect("/forgot");a.resetPasswordToken=n,a.resetPasswordExpires=Date.now()+36e5,a.save(function(e){t(e,n,a)})})},function(r,n,t){var o=s.default.createTransport({service:"Gmail",auth:{user:"ricardovalenca@gmail.com",pass:process.env.GMAILPW}}),a={to:n.email,from:"ricardovalenca@gmail.com",subject:"YelpCamp Password Reset",text:"You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\nhttp://"+e.headers.host+"/reset/"+r+"\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n"};o.sendMail(a,function(r){console.log("change password email sent"),e.flash("success","An email has been sent to "+n.email+" with further instructions."),t(r,"done")})}],function(e){if(e)return n(e);r.redirect("/forgot")})}),f.get("/reset/:token",function(e,r){d.default.findOne({resetPasswordToken:e.params.token,resetPasswordExpires:{$gt:Date.now()}},function(n,t){if(!t)return e.flash("error","Password reset token is invalid or has expired."),r.redirect("/forgot");r.render("reset",{token:e.params.token})})}),f.post("/reset/:token",function(e,r){i.default.waterfall([function(n){d.default.findOne({resetPasswordToken:e.params.token,resetPasswordExpires:{$gt:Date.now()}},function(t,o){return o?e.body.password!==e.body.confirm?(e.flash("error","Passwords do not match."),r.redirect("back")):void o.setPassword(e.body.password,function(r){o.resetPasswordToken=void 0,o.resetPasswordExpires=void 0,o.save(function(r){e.logIn(o,function(e){n(e,o)})})}):(e.flash("error","Password reset token is invalid or has expired."),r.redirect("back"))})},function(r,n){var t=s.default.createTransport({service:"Gmail",auth:{user:"ricardovalenca@gmail.com",pass:process.env.GMAILPW}}),o={to:r.email,from:"ricardovalenca@gmail.com",subject:"Your password has been changed",text:"Hello,\n\nThis is a confirmation that the password for your account "+r.email+" has just been changed.\n"};t.sendMail(o,function(r){e.flash("success","Success! Your password has been changed."),n(r)})}],function(e){r.redirect("/campgrounds")})}),f.get("/users/:id",function(e,r){d.default.findById(e.params.id,function(n,t){n?(console.log(n),e.flash("error","Something went wrong finding the user"),r.redirect("/")):c.default.find().where("author.id").equals(t._id).exec(function(n,o){n?(console.log(n),e.flash("error","Something went wrong finding the campgrounds created by this user")):r.render("users/show",{user:t,campgrounds:o})})})}),e.exports=f},function(e,r){e.exports=require("async")},function(e,r){e.exports=require("nodemailer")},function(e,r){e.exports=require("crypto")}]);