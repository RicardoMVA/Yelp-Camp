!function(e){var r={};function o(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=e,o.c=r,o.d=function(e,r,n){o.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,r){if(1&r&&(e=o(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var t in e)o.d(n,t,function(r){return e[r]}.bind(null,t));return n},o.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(r,"a",r),r},o.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},o.p="",o(o.s=7)}([function(e,r,o){"use strict";var n,t=o(2),s=(n=t)&&n.__esModule?n:{default:n};var i=new s.default.Schema({name:String,image:String,description:String,location:String,lat:Number,lng:Number,price:String,createdAt:{type:Date,default:Date.now},author:{id:{type:s.default.Schema.Types.ObjectId,ref:"User"},username:String},comments:[{type:s.default.Schema.Types.ObjectId,ref:"Comment"}]});e.exports=s.default.model("Campground",i)},function(e,r){e.exports=require("express")},function(e,r){e.exports=require("mongoose")},function(e,r,o){"use strict";var n,t=o(2),s=(n=t)&&n.__esModule?n:{default:n};var i=s.default.Schema({text:String,createdAt:{type:Date,default:Date.now},author:{id:{type:s.default.Schema.Types.ObjectId,ref:"User"},username:String}});e.exports=s.default.model("Comment",i)},function(e,r){e.exports=require("passport")},function(e,r,o){"use strict";var n=s(o(2)),t=s(o(17));function s(e){return e&&e.__esModule?e:{default:e}}var i=new n.default.Schema({username:{type:String,unique:!0,required:!0},picture:String,email:{type:String,unique:!0,required:!0},password:String,resetPasswordToken:String,resetPasswordExpires:Date,isAdmin:{type:Boolean,default:!1}});i.plugin(t.default),e.exports=n.default.model("User",i)},function(e,r,o){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.checkLogin=r.checkCommentOwnership=r.checkCampgroundOwnership=void 0;var n=s(o(0)),t=s(o(3));function s(e){return e&&e.__esModule?e:{default:e}}r.checkCampgroundOwnership=function(e,r,o){e.isAuthenticated()?n.default.findById(e.params.id,function(n,t){n||!t?(console.log(n),e.flash("error","Campground not found"),r.redirect("back")):t.author.id.equals(e.user._id)||e.user.isAdmin?o():(e.flash("error","You need to be the campground author to do that!"),r.redirect("back"))}):(e.flash("error","You need to be logged in to do that"),r.redirect("back"))},r.checkCommentOwnership=function(e,r,o){e.isAuthenticated()?t.default.findById(e.params.comment_id,function(n,t){n||!t?(console.log(n),e.flash("error","Comment not found"),r.redirect("back")):t.author.id.equals(e.user._id)||e.user.isAdmin?o():(e.flash("error","You need to be the comment author to do that!"),r.redirect("back"))}):(e.flash("error","You need to be logged in to do that"),r.redirect("back"))},r.checkLogin=function(e,r,o){if(e.isAuthenticated())return o();e.flash("error","You need to be logged in to do that"),r.redirect("/login")}},function(e,r,o){o(8),e.exports=o(9)},function(e,r){e.exports=require("babel-polyfill")},function(e,r,o){"use strict";var n=y(o(10)),t=y(o(1)),s=y(o(11)),i=y(o(12)),a=y(o(2)),c=y(o(4)),d=y(o(13)),u=y(o(14)),l=y(o(15)),f=y(o(16)),g=(y(o(0)),y(o(3)),y(o(5))),m=y(o(18)),p=y(o(19)),h=y(o(24));function y(e){return e&&e.__esModule?e:{default:e}}n.default.config();var w=(0,t.default)();a.default.set("useCreateIndex",!0),a.default.set("useFindAndModify",!1);var b=process.env.DATABASEURL||"mongodb://localhost/yelp_camp";a.default.connect(b,{useNewUrlParser:!0}),w.use(i.default.urlencoded({extended:!0})),w.set("view engine","ejs"),w.use((0,u.default)("_method")),w.use(t.default.static(__dirname+"/public")),w.use("/images",t.default.static(__dirname+"/images")),w.use((0,l.default)()),w.locals.moment=f.default,w.use((0,s.default)({secret:"Once again, Rusty wins cutest dog!",resave:!1,saveUninitialized:!1})),w.use(c.default.initialize()),w.use(c.default.session()),c.default.use(new d.default(g.default.authenticate())),c.default.serializeUser(g.default.serializeUser()),c.default.deserializeUser(g.default.deserializeUser()),w.use(function(e,r,o){r.locals.currentUser=e.user,r.locals.error=e.flash("error"),r.locals.success=e.flash("success"),o()}),w.use(h.default),w.use("/campgrounds",p.default),w.use("/campgrounds/:id/comments",m.default),w.listen(process.env.PORT||3e3,function(){console.log("YelpCamp server started!")})},function(e,r){e.exports=require("dotenv")},function(e,r){e.exports=require("express-session")},function(e,r){e.exports=require("body-parser")},function(e,r){e.exports=require("passport-local")},function(e,r){e.exports=require("method-override")},function(e,r){e.exports=require("connect-flash")},function(e,r){e.exports=require("moment")},function(e,r){e.exports=require("passport-local-mongoose")},function(e,r,o){"use strict";var n=o(6),t=o(1).Router({mergeParams:!0}),s=o(0),i=o(3);t.get("/new",n.checkLogin,function(e,r){s.findById(e.params.id,function(e,o){e?(console.log("Something went wrong when finding the ID to write a new comment"),console.log(e)):r.render("comments/new",{campground:o})})}),t.post("/",n.checkLogin,function(e,r){s.findById(e.params.id,function(o,n){o?(console.log("Something went wrong when adding a new comment"),console.log(o),r.redirect("/campgrounds")):i.create(e.body.comment,function(o,t){o?(e.flash("error","Something went wrong when adding the comment"),console.log(o)):(t.author.id=e.user._id,t.author.username=e.user.username,t.save(),n.comments.push(t),n.save(),e.flash("success","New comment addded successfully"),console.log(t),r.redirect("/campgrounds/"+n._id))})})}),t.get("/:comment_id/edit",n.checkCommentOwnership,function(e,r){s.findById(e.params.id,function(o,n){if(o||!n)return e.flash("error","Cannot find the campground"),r.redirect("back");i.findById(e.params.comment_id,function(o,n){o?(console.log(o),r.redirect("back")):r.render("comments/edit",{campground_id:e.params.id,comment:n})})})}),t.put("/:comment_id",n.checkCommentOwnership,function(e,r){i.findByIdAndUpdate(e.params.comment_id,e.body.comment,function(o,n){o?(console.log(o),r.redirect("back")):(e.flash("success","Comment edited successfully"),r.redirect("/campgrounds/"+e.params.id))})}),t.delete("/:comment_id",n.checkCommentOwnership,function(e,r){i.findByIdAndRemove(e.params.comment_id,function(o,n){o?(console.log(o),e.flash("error","Something went wrong when deleting the comment"),r.redirect("back")):(e.flash("success","Comment deleted successfully"),r.redirect("/campgrounds/"+e.params.id))})}),e.exports=t},function(e,r,o){"use strict";var n=o(6),t=o(1).Router(),s=o(0),i=o(20),a=o(21),c=o(22),d=i.diskStorage({filename:function(e,r,o){o(null,Date.now()+r.originalname)}}),u=i({storage:d,fileFilter:function(e,r,o){if(!r.originalname.match(/\.(jpg|jpeg|png|gif)$/i))return o(new Error("Only image files (jpg, jpeg, png or gif) are allowed!"),!1);o(null,!0)}}),l=o(23)({provider:"google",httpAdapter:"https",apiKey:process.env.GEOCODER_API_KEY,formatter:null});t.get("/",function(e,r){if(e.query.search){var o=new RegExp(e.query.search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"gi");s.find({name:o},function(o,n){o?(console.log("Error loading the database"),console.log(o)):n.length<1?(e.flash("error","No campgrounds match that query, please try again"),r.redirect("campgrounds/index")):r.render("campgrounds/index",{campgrounds:n,page:"campgrounds"})})}else s.find({},function(e,o){e?(console.log("Error loading the database"),console.log(e)):r.render("campgrounds/index",{campgrounds:o,page:"campgrounds"})})}),t.get("/new",n.checkLogin,function(e,r){r.render("campgrounds/new")}),t.post("/",n.checkLogin,u.single("image"),function(e,r){a(e.file.path).jpeg({quality:80}).resize(1200).toFile("images/campgrounds/"+e.file.filename+"-large.jpg",function(o,n){if(o)return e.flash("error","Could not optimize image file"),console.log(o),r.redirect("back");l.geocode(e.body.location,function(o,n){if(o||!n.length)return e.flash("error","Address not found"),console.log(o),r.redirect("back");var t=n[0].latitude,i=n[0].longitude,a=n[0].formattedAddress,c={id:e.user._id,username:e.user.username},d={name:e.body.name,image:e.file.filename+"-large.jpg",price:e.body.price,description:e.body.description,author:c,location:a,lat:t,lng:i};s.create(d,function(o,n){if(o)return e.flash("error","Something went wrong when creating the campground"),console.log(o),r.redirect("back");e.flash("success","Campground created successfully"),console.log(n),r.redirect("/campgrounds")})})})}),t.get("/:id/edit",n.checkCampgroundOwnership,function(e,r){s.findById(e.params.id,function(o,n){o?(console.log(o),e.flash("error","Address not found"),r.redirect("back")):r.render("campgrounds/edit",{campground:n})})}),t.put("/:id",n.checkCampgroundOwnership,u.single("image"),function(e,r){e.file?a(e.file.path).jpeg({quality:80}).resize(2400).toFile("images/campgrounds/"+e.file.filename+"-large.jpg",function(o,n){if(o)return e.flash("error","Could not load and optimize image file"),console.log(o),r.redirect("back");s.findById(e.params.id,function(o,n){c.unlink("images/campgrounds/"+n.image,function(o){console.log(o),console.log("images/campgrounds/"+n.image+" was deleted"),e.body.campground.image=e.file.filename+"-large.jpg",l.geocode(e.body.location,function(o,n){if(o||!n.length)return e.flash("error",o),console.log(o),r.redirect("back");e.body.campground.lat=n[0].latitude,e.body.campground.lng=n[0].longitude,e.body.campground.location=n[0].formattedAddress,s.findByIdAndUpdate(e.params.id,e.body.campground,function(o,n){o?(console.log(o),e.flash("error",o.message),r.redirect("/campgrounds")):(e.flash("success","Campground edited successfully"),r.redirect("/campgrounds/"+e.params.id))})})})})}):l.geocode(e.body.location,function(o,n){if(o||!n.length)return e.flash("error",o),console.log(o),r.redirect("back");e.body.campground.lat=n[0].latitude,e.body.campground.lng=n[0].longitude,e.body.campground.location=n[0].formattedAddress,s.findByIdAndUpdate(e.params.id,e.body.campground,function(o,n){o?(console.log(o),e.flash("error",o.message),r.redirect("/campgrounds")):(e.flash("success","Campground edited successfully"),r.redirect("/campgrounds/"+e.params.id))})})}),t.delete("/:id",n.checkCampgroundOwnership,function(e,r){s.findById(e.params.id,function(o,n){c.unlink("images/campgrounds/"+n.image,function(o){console.log(o),console.log("images/campgrounds/"+n.image+" was deleted"),s.findByIdAndRemove(e.params.id,function(o){o?(console.log(o),e.flash("error","Something went wrong when deleting the campground"),r.redirect("/campgrounds")):(e.flash("success","Campground deleted successfully"),r.redirect("/campgrounds"))})})})}),t.get("/:id",function(e,r){s.findById(e.params.id).populate("comments").exec(function(o,n){o||!n?(e.flash("error","Campground not found"),console.log(o),r.redirect("back")):r.render("campgrounds/show",{campground:n})})}),e.exports=t},function(e,r){e.exports=require("multer")},function(e,r){e.exports=require("sharp")},function(e,r){e.exports=require("fs")},function(e,r){e.exports=require("node-geocoder")},function(e,r,o){"use strict";var n=o(1).Router(),t=o(4),s=o(5),i=o(0),a=o(25),c=o(26),d=o(27);n.get("/",function(e,r){r.render("landing")}),n.get("/register",function(e,r){r.render("register",{page:"register"})}),n.post("/register",function(e,r){var o=new s({username:e.body.username,picture:e.body.picture,email:e.body.email});"secretcode"===e.body.adminCode&&(o.isAdmin=!0),s.register(o,e.body.password,function(o,n){if(o)return console.log(o),e.flash("error",o.message),r.redirect("/register");t.authenticate("local")(e,r,function(){e.flash("success","Welcome to YelpCamp "+n.username),r.redirect("/campgrounds")})})}),n.get("/login",function(e,r){r.render("login",{page:"login"})}),n.post("/login",function(e,r,o){t.authenticate("local",function(n,t,s){if(n||!t)return e.flash("error","User doesn't exist or password is incorrect"),r.redirect("/login");e.logIn(t,function(n){return n?(console.log(n),e.flash("error",n),r.redirect("/login"),o(n)):(e.flash("success","Welcome back, "+t.username),r.redirect("/campgrounds"))})})(e,r,o)}),n.get("/logout",function(e,r){e.logout(),e.flash("success","Logged you out!"),r.redirect("/campgrounds")}),n.get("/forgot",function(e,r){r.render("forgot")}),n.post("/forgot",function(e,r,o){a.waterfall([function(e){d.randomBytes(20,function(r,o){var n=o.toString("hex");e(r,n)})},function(o,n){s.findOne({email:e.body.email},function(t,s){if(!s)return e.flash("error","No account with that email address exists."),r.redirect("/forgot");s.resetPasswordToken=o,s.resetPasswordExpires=Date.now()+36e5,s.save(function(e){n(e,o,s)})})},function(r,o,n){var t=c.createTransport({service:"Gmail",auth:{user:"ricardovalenca@gmail.com",pass:process.env.GMAILPW}}),s={to:o.email,from:"ricardovalenca@gmail.com",subject:"YelpCamp Password Reset",text:"You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\nhttp://"+e.headers.host+"/reset/"+r+"\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n"};t.sendMail(s,function(r){console.log("change password email sent"),e.flash("success","An email has been sent to "+o.email+" with further instructions."),n(r,"done")})}],function(e){if(e)return o(e);r.redirect("/forgot")})}),n.get("/reset/:token",function(e,r){s.findOne({resetPasswordToken:e.params.token,resetPasswordExpires:{$gt:Date.now()}},function(o,n){if(!n)return e.flash("error","Password reset token is invalid or has expired."),r.redirect("/forgot");r.render("reset",{token:e.params.token})})}),n.post("/reset/:token",function(e,r){a.waterfall([function(o){s.findOne({resetPasswordToken:e.params.token,resetPasswordExpires:{$gt:Date.now()}},function(n,t){return t?e.body.password!==e.body.confirm?(e.flash("error","Passwords do not match."),r.redirect("back")):void t.setPassword(e.body.password,function(r){t.resetPasswordToken=void 0,t.resetPasswordExpires=void 0,t.save(function(r){e.logIn(t,function(e){o(e,t)})})}):(e.flash("error","Password reset token is invalid or has expired."),r.redirect("back"))})},function(r,o){var n=c.createTransport({service:"Gmail",auth:{user:"ricardovalenca@gmail.com",pass:process.env.GMAILPW}}),t={to:r.email,from:"ricardovalenca@gmail.com",subject:"Your password has been changed",text:"Hello,\n\nThis is a confirmation that the password for your account "+r.email+" has just been changed.\n"};n.sendMail(t,function(r){e.flash("success","Success! Your password has been changed."),o(r)})}],function(e){r.redirect("/campgrounds")})}),n.get("/users/:id",function(e,r){s.findById(e.params.id,function(o,n){o?(console.log(o),e.flash("error","Something went wrong finding the user"),r.redirect("/")):i.find().where("author.id").equals(n._id).exec(function(o,t){o?(console.log(o),e.flash("error","Something went wrong finding the campgrounds created by this user")):r.render("users/show",{user:n,campgrounds:t})})})}),e.exports=n},function(e,r){e.exports=require("async")},function(e,r){e.exports=require("nodemailer")},function(e,r){e.exports=require("crypto")}]);