export const authentication = {
    login : '/login',
    register : '/register',
    forgotPassword:'/forgot-password',
    resetPassword:'/reset-password/:token',
    verifyEmail:'/verify-account/:token',
    createOrganisation:'/create/company/:token',
    createOrganisationStep1:'/create/company',
}

export const dashboard = {
    home:'/dashboard',
    testimonial : '/dashboard/testimonial',
    videos:'/dashboard/videos',
    class:'/dashboard/class',
    quiz:'/dashboard/quiz',
    student:{
      index : '/dashboard/students',
      table : '/dashboard/students/:type',
      profile : '/dashboard/students/class/:className/:profileTab'
    },
    teacher:{
      index : '/dashboard/teachers'
    },
    staff:{
      index : '/dashboard/staffs'
    }
}

export const main = {
  home: "/",
  about: "/about",
  project:"/project",
  changePassword: "/profile?&profileTab=change-password",
  contact: "/contact",
  courses: "/courses",
  testimonial: "/testimonial",
  video: "/videos",
  profile: "/profile",
  profileTab: "/profile/:profileTab",
  faq: "/faq",
  blog: "/blog",
  createBlog: "/blog/create",
  singleBlog:'/blog/:blogTitle',
  addingparaform: "/addingparaform",
  quizIndex:'/quiz',
  quizTitle:'/quiz/:quizTitle',
  quizQuestionIndex:'/quiz/:quizTitle/:categoryTitle'
};

export const privateMain = {
  createBlog: "/blog/create"
}