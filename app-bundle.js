!function(e){var r={};function n(o){if(r[o])return r[o].exports;var t=r[o]={i:o,l:!1,exports:{}};return e[o].call(t.exports,t,t.exports,n),t.l=!0,t.exports}n.m=e,n.c=r,n.d=function(e,r,o){n.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,r){if(1&r&&(e=n(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var t in e)n.d(o,t,function(r){return e[r]}.bind(null,t));return o},n.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(r,"a",r),r},n.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},n.p="",n(n.s=8)}([function(e,r,n){"use strict";var o,t=n(2),a=(o=t)&&o.__esModule?o:{default:o};var s=new a.default.Schema({name:String,image:String,description:String,location:String,lat:Number,lng:Number,price:String,createdAt:{type:Date,default:Date.now},author:{id:{type:a.default.Schema.Types.ObjectId,ref:"User"},username:String},comments:[{type:a.default.Schema.Types.ObjectId,ref:"Comment"}]});e.exports=a.default.model("Campground",s)},function(e,r){e.exports=require("express")},function(e,r){e.exports=require("mongoose")},function(e,r){e.exports=require("dotenv")},function(e,r,n){"use strict";var o,t=n(2),a=(o=t)&&o.__esModule?o:{default:o};var s=a.default.Schema({text:String,createdAt:{type:Date,default:Date.now},author:{id:{type:a.default.Schema.Types.ObjectId,ref:"User"},username:String}});e.exports=a.default.model("Comment",s)},function(e,r){e.exports=require("passport")},function(e,r,n){"use strict";var o=a(n(2)),t=a(n(17));function a(e){return e&&e.__esModule?e:{default:e}}var s=new o.default.Schema({username:{type:String,unique:!0,required:!0},picture:String,email:{type:String,unique:!0,required:!0},password:String,resetPasswordToken:String,resetPasswordExpires:Date,isAdmin:{type:Boolean,default:!1}});s.plugin(t.default),e.exports=o.default.model("User",s)},function(e,r,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.checkLogin=r.checkCommentOwnership=r.checkCampgroundOwnership=void 0;var o=a(n(0)),t=a(n(4));function a(e){return e&&e.__esModule?e:{default:e}}r.checkCampgroundOwnership=function(e,r,n){e.isAuthenticated()?o.default.findById(e.params.id,function(o,t){o||!t?(console.log(o),e.flash("error","Campground not found"),r.redirect("back")):t.author.id.equals(e.user._id)||e.user.isAdmin?n():(e.flash("error","You need to be the campground author to do that!"),r.redirect("back"))}):(e.flash("error","You need to be logged in to do that"),r.redirect("back"))},r.checkCommentOwnership=function(e,r,n){e.isAuthenticated()?t.default.findById(e.params.comment_id,function(o,t){o||!t?(console.log(o),e.flash("error","Comment not found"),r.redirect("back")):t.author.id.equals(e.user._id)||e.user.isAdmin?n():(e.flash("error","You need to be the comment author to do that!"),r.redirect("back"))}):(e.flash("error","You need to be logged in to do that"),r.redirect("back"))},r.checkLogin=function(e,r,n){if(e.isAuthenticated())return n();e.flash("error","You need to be logged in to do that"),r.redirect("/login")}},function(e,r,n){n(9),e.exports=n(10)},function(e,r){e.exports=require("babel-polyfill")},function(e,r,n){"use strict";var o=y(n(3)),t=y(n(1)),a=y(n(11)),s=y(n(12)),i=y(n(2)),d=y(n(5)),u=y(n(13)),c=y(n(14)),l=y(n(15)),f=y(n(16)),g=(y(n(0)),y(n(4)),y(n(6))),m=y(n(18)),p=y(n(19)),h=y(n(24));function y(e){return e&&e.__esModule?e:{default:e}}o.default.config();var w=(0,t.default)();i.default.set("useCreateIndex",!0),i.default.set("useFindAndModify",!1);var b=process.env.DATABASEURL||"mongodb://localhost/yelp_camp";i.default.connect(b,{useNewUrlParser:!0}),w.use(s.default.urlencoded({extended:!0})),w.set("view engine","ejs"),w.use((0,c.default)("_method")),w.use(t.default.static(__dirname+"/public")),w.use("/images",t.default.static(__dirname+"/images")),w.use((0,l.default)()),w.locals.moment=f.default,w.use((0,a.default)({secret:"Once again, Rusty wins cutest dog!",resave:!1,saveUninitialized:!1})),w.use(d.default.initialize()),w.use(d.default.session()),d.default.use(new u.default(g.default.authenticate())),d.default.serializeUser(g.default.serializeUser()),d.default.deserializeUser(g.default.deserializeUser()),w.use(function(e,r,n){r.locals.currentUser=e.user,r.locals.error=e.flash("error"),r.locals.success=e.flash("success"),n()}),w.use(h.default),w.use("/campgrounds",p.default),w.use("/campgrounds/:id/comments",m.default),w.listen(process.env.PORT||3e3,function(){console.log("YelpCamp server started!")})},function(e,r){e.exports=require("express-session")},function(e,r){e.exports=require("body-parser")},function(e,r){e.exports=require("passport-local")},function(e,r){e.exports=require("method-override")},function(e,r){e.exports=require("connect-flash")},function(e,r){e.exports=require("moment")},function(e,r){e.exports=require("passport-local-mongoose")},function(e,r,n){"use strict";var o=i(n(1)),t=i(n(0)),a=i(n(4)),s=n(7);function i(e){return e&&e.__esModule?e:{default:e}}var d=o.default.Router({mergeParams:!0});d.get("/new",s.checkLogin,function(e,r){t.default.findById(e.params.id,function(e,n){e?(console.log("Something went wrong when finding the ID to write a new comment"),console.log(e)):r.render("comments/new",{campground:n})})}),d.post("/",s.checkLogin,function(e,r){t.default.findById(e.params.id,function(n,o){n?(console.log("Something went wrong when adding a new comment"),console.log(n),r.redirect("/campgrounds")):a.default.create(e.body.comment,function(n,t){n?(e.flash("error","Something went wrong when adding the comment"),console.log(n)):(t.author.id=e.user._id,t.author.username=e.user.username,t.save(),o.comments.push(t),o.save(),e.flash("success","New comment addded successfully"),console.log(t),r.redirect("/campgrounds/"+o._id))})})}),d.get("/:comment_id/edit",s.checkCommentOwnership,function(e,r){t.default.findById(e.params.id,function(n,o){if(n||!o)return e.flash("error","Cannot find the campground"),r.redirect("back");a.default.findById(e.params.comment_id,function(n,o){n?(console.log(n),r.redirect("back")):r.render("comments/edit",{campground_id:e.params.id,comment:o})})})}),d.put("/:comment_id",s.checkCommentOwnership,function(e,r){a.default.findByIdAndUpdate(e.params.comment_id,e.body.comment,function(n,o){n?(console.log(n),r.redirect("back")):(e.flash("success","Comment edited successfully"),r.redirect("/campgrounds/"+e.params.id))})}),d.delete("/:comment_id",s.checkCommentOwnership,function(e,r){a.default.findByIdAndRemove(e.params.comment_id,function(n,o){n?(console.log(n),e.flash("error","Something went wrong when deleting the comment"),r.redirect("back")):(e.flash("success","Comment deleted successfully"),r.redirect("/campgrounds/"+e.params.id))})}),e.exports=d},function(e,r,n){"use strict";var o=l(n(3)),t=l(n(1)),a=l(n(20)),s=l(n(21)),i=l(n(22)),d=l(n(23)),u=l(n(0)),c=n(7);function l(e){return e&&e.__esModule?e:{default:e}}o.default.config();var f=t.default.Router(),g=a.default.diskStorage({filename:function(e,r,n){n(null,Date.now()+r.originalname)}}),m=(0,a.default)({storage:g,fileFilter:function(e,r,n){if(!r.originalname.match(/\.(jpg|jpeg|png|gif)$/i))return n(new Error("Only image files (jpg, jpeg, png or gif) are allowed!"),!1);n(null,!0)}}),p={provider:"google",httpAdapter:"https",apiKey:process.env.GEOCODER_API_KEY,formatter:null},h=(0,d.default)(p);f.get("/",function(e,r){if(e.query.search){var n=new RegExp(y(e.query.search),"gi");u.default.find({name:n},function(n,o){n?(console.log("Error loading the database"),console.log(n)):o.length<1?(e.flash("error","No campgrounds match that query, please try again"),r.redirect("campgrounds/index")):r.render("campgrounds/index",{campgrounds:o,page:"campgrounds"})})}else u.default.find({},function(e,n){e?(console.log("Error loading the database"),console.log(e)):r.render("campgrounds/index",{campgrounds:n,page:"campgrounds"})})}),f.get("/new",c.checkLogin,function(e,r){r.render("campgrounds/new")}),f.post("/",c.checkLogin,m.single("image"),function(e,r){(0,s.default)(e.file.path).jpeg({quality:80}).resize(1200).toFile("images/campgrounds/"+e.file.filename+"-large.jpg",function(n,o){if(n)return e.flash("error","Could not optimize image file"),console.log(n),r.redirect("back");h.geocode(e.body.location,function(n,o){if(n||!o.length)return e.flash("error","Address not found"),console.log(n),r.redirect("back");var t=o[0].latitude,a=o[0].longitude,s=o[0].formattedAddress,i={id:e.user._id,username:e.user.username},d={name:e.body.name,image:e.file.filename+"-large.jpg",price:e.body.price,description:e.body.description,author:i,location:s,lat:t,lng:a};u.default.create(d,function(n,o){if(n)return e.flash("error","Something went wrong when creating the campground"),console.log(n),r.redirect("back");e.flash("success","Campground created successfully"),console.log(o),r.redirect("/campgrounds")})})})}),f.get("/:id/edit",c.checkCampgroundOwnership,function(e,r){u.default.findById(e.params.id,function(n,o){n?(console.log(n),e.flash("error","Address not found"),r.redirect("back")):r.render("campgrounds/edit",{campground:o})})}),f.put("/:id",c.checkCampgroundOwnership,m.single("image"),function(e,r){e.file?(0,s.default)(e.file.path).jpeg({quality:80}).resize(2400).toFile("images/campgrounds/"+e.file.filename+"-large.jpg",function(n,o){if(n)return e.flash("error","Could not load and optimize image file"),console.log(n),r.redirect("back");u.default.findById(e.params.id,function(n,o){i.default.unlink("images/campgrounds/"+o.image,function(n){console.log(n),console.log("images/campgrounds/"+o.image+" was deleted"),e.body.campground.image=e.file.filename+"-large.jpg",h.geocode(e.body.location,function(n,o){if(n||!o.length)return e.flash("error",n),console.log(n),r.redirect("back");e.body.campground.lat=o[0].latitude,e.body.campground.lng=o[0].longitude,e.body.campground.location=o[0].formattedAddress,u.default.findByIdAndUpdate(e.params.id,e.body.campground,function(n,o){n?(console.log(n),e.flash("error",n.message),r.redirect("/campgrounds")):(e.flash("success","Campground edited successfully"),r.redirect("/campgrounds/"+e.params.id))})})})})}):h.geocode(e.body.location,function(n,o){if(n||!o.length)return e.flash("error",n),console.log(n),r.redirect("back");e.body.campground.lat=o[0].latitude,e.body.campground.lng=o[0].longitude,e.body.campground.location=o[0].formattedAddress,u.default.findByIdAndUpdate(e.params.id,e.body.campground,function(n,o){n?(console.log(n),e.flash("error",n.message),r.redirect("/campgrounds")):(e.flash("success","Campground edited successfully"),r.redirect("/campgrounds/"+e.params.id))})})}),f.delete("/:id",c.checkCampgroundOwnership,function(e,r){u.default.findById(e.params.id,function(n,o){i.default.unlink("images/campgrounds/"+o.image,function(n){console.log(n),console.log("images/campgrounds/"+o.image+" was deleted"),u.default.findByIdAndRemove(e.params.id,function(n){n?(console.log(n),e.flash("error","Something went wrong when deleting the campground"),r.redirect("/campgrounds")):(e.flash("success","Campground deleted successfully"),r.redirect("/campgrounds"))})})})}),f.get("/:id",function(e,r){u.default.findById(e.params.id).populate("comments").exec(function(n,o){n||!o?(e.flash("error","Campground not found"),console.log(n),r.redirect("back")):r.render("campgrounds/show",{campground:o})})});var y=function(e){return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")};e.exports=f},function(e,r){e.exports=require("multer")},function(e,r){e.exports=require("sharp")},function(e,r){e.exports=require("fs")},function(e,r){e.exports=require("node-geocoder")},function(e,r,n){"use strict";var o=l(n(3)),t=l(n(1)),a=l(n(5)),s=l(n(25)),i=l(n(26)),d=l(n(27)),u=l(n(0)),c=l(n(6));function l(e){return e&&e.__esModule?e:{default:e}}o.default.config();var f=t.default.Router();f.get("/",function(e,r){r.render("landing")}),f.get("/register",function(e,r){r.render("register",{page:"register"})}),f.post("/register",function(e,r){var n=new c.default({username:e.body.username,picture:e.body.picture,email:e.body.email});"secretcode"===e.body.adminCode&&(n.isAdmin=!0),c.default.register(n,e.body.password,function(n,o){if(n)return console.log(n),e.flash("error",n.message),r.redirect("/register");a.default.authenticate("local")(e,r,function(){e.flash("success","Welcome to YelpCamp "+o.username),r.redirect("/campgrounds")})})}),f.get("/login",function(e,r){r.render("login",{page:"login"})}),f.post("/login",function(e,r,n){a.default.authenticate("local",function(o,t,a){if(o||!t)return e.flash("error","User doesn't exist or password is incorrect"),r.redirect("/login");e.logIn(t,function(o){return o?(console.log(o),e.flash("error",o),r.redirect("/login"),n(o)):(e.flash("success","Welcome back, "+t.username),r.redirect("/campgrounds"))})})(e,r,n)}),f.get("/logout",function(e,r){e.logout(),e.flash("success","Logged you out!"),r.redirect("/campgrounds")}),f.get("/forgot",function(e,r){r.render("forgot")}),f.post("/forgot",function(e,r,n){s.default.waterfall([function(e){d.default.randomBytes(20,function(r,n){var o=n.toString("hex");e(r,o)})},function(n,o){c.default.findOne({email:e.body.email},function(t,a){if(!a)return e.flash("error","No account with that email address exists."),r.redirect("/forgot");a.resetPasswordToken=n,a.resetPasswordExpires=Date.now()+36e5,a.save(function(e){o(e,n,a)})})},function(r,n,o){var t=i.default.createTransport({service:"Gmail",auth:{user:"ricardovalenca@gmail.com",pass:process.env.GMAILPW}}),a={to:n.email,from:"ricardovalenca@gmail.com",subject:"YelpCamp Password Reset",text:"You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\nhttp://"+e.headers.host+"/reset/"+r+"\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n"};t.sendMail(a,function(r){console.log("change password email sent"),e.flash("success","An email has been sent to "+n.email+" with further instructions."),o(r,"done")})}],function(e){if(e)return n(e);r.redirect("/forgot")})}),f.get("/reset/:token",function(e,r){c.default.findOne({resetPasswordToken:e.params.token,resetPasswordExpires:{$gt:Date.now()}},function(n,o){if(!o)return e.flash("error","Password reset token is invalid or has expired."),r.redirect("/forgot");r.render("reset",{token:e.params.token})})}),f.post("/reset/:token",function(e,r){s.default.waterfall([function(n){c.default.findOne({resetPasswordToken:e.params.token,resetPasswordExpires:{$gt:Date.now()}},function(o,t){return t?e.body.password!==e.body.confirm?(e.flash("error","Passwords do not match."),r.redirect("back")):void t.setPassword(e.body.password,function(r){t.resetPasswordToken=void 0,t.resetPasswordExpires=void 0,t.save(function(r){e.logIn(t,function(e){n(e,t)})})}):(e.flash("error","Password reset token is invalid or has expired."),r.redirect("back"))})},function(r,n){var o=i.default.createTransport({service:"Gmail",auth:{user:"ricardovalenca@gmail.com",pass:process.env.GMAILPW}}),t={to:r.email,from:"ricardovalenca@gmail.com",subject:"Your password has been changed",text:"Hello,\n\nThis is a confirmation that the password for your account "+r.email+" has just been changed.\n"};o.sendMail(t,function(r){e.flash("success","Success! Your password has been changed."),n(r)})}],function(e){r.redirect("/campgrounds")})}),f.get("/users/:id",function(e,r){c.default.findById(e.params.id,function(n,o){n?(console.log(n),e.flash("error","Something went wrong finding the user"),r.redirect("/")):u.default.find().where("author.id").equals(o._id).exec(function(n,t){n?(console.log(n),e.flash("error","Something went wrong finding the campgrounds created by this user")):r.render("users/show",{user:o,campgrounds:t})})})}),e.exports=f},function(e,r){e.exports=require("async")},function(e,r){e.exports=require("nodemailer")},function(e,r){e.exports=require("crypto")}]);