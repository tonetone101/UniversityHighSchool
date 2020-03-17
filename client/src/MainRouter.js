import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";

import Signup from './user/SignUp'
import Signin from './user/SignIn'

import SpanishSignup from './user/SpanishSignUp'
import SpanishSignin from './user/SpanishSignin'

import PortSignUp from './user/portSignUp'
import PortSignIn from './user/portSignIn'

import khmerSignUp from './user/khmerSignUp'
import khmerSignIn from './user/khmerSignIn'

import Home from './core/Home'
import Menu from './core/Menu'
//import Header from './core/Header'
import TopHeader from './core/TopHeader'
import Header from './english/header/Header'

// english
import NewCarousel from './english/carousel/NewCarousel'
import EditCarousel from './english/carousel/EditCarousel'
import Carol from './english/carousel/Carousel'
import NewEvent from './english/events/NewEvents'
import Event from './english/events/Events'
import EditEvent from './english/events/EditEvent'
import SingleEvent from './english/events/SingleEvent'
import NewFaculty from './english/Faculty/NewFaculty'
import Faculty from './english/Faculty/Faculty'
import SingleFaculty from './english/Faculty/SingleFaculty'
import EditFaculty from './english/Faculty/EditFaculty'
import NewStudent from './english/student/NewStudent'
import Admission from './english/student/Admission'

import Applicants from './english/student/Applicants'
import SingleApplicant from './english/student/SingleApplicant'

import Bully from './english/student/Bully'
import Student from './english/student/Student'
import GenderPolicy from './english/student/GenderPolicy'
import NewLinks from './english/student/NewLinks'
import SingleLink from './english/student/SingleLink'
import NewPhoto from './english/gallery/NewPhoto'
import Photo from './english/gallery/Photo'
import SinglePhoto from './english/gallery/SinglePhoto'
import EditPhoto from './english/gallery/EditPhoto'
import NewPartners from './english/partners/NewPartners'
import Partners from './english/partners/Partners'
import SinglePartners from './english/partners/SinglePartner'
import EditPartners from './english/partners/EditPartners'

import SchoolBoardMeeting from './english/schoolBoard/Main'
import NewBoardMeeting from './english/schoolBoard/NewBoardMeeting'
import SingleBoardMeeting from './english/schoolBoard/singleMain'
import UpdatechoolBoardMeeting from './english/schoolBoard/updateMeetings'


import SchoolBoardMember from './english/schoolBoard/Members'
import NewSchoolBoardMember from './english/schoolBoard/NewMembers'
import SingleSchoolBoardMember from './english/schoolBoard/SingleMembers'

import About from './english/about/About'
import EditAbout from './english/about/EditAbout'

import Applications from './english/application/Application'
import NewApplication from './english/application/NewApplication'
import SingleApplication from './english/application/SingleApplication'

import HR from './english/humanResource/Hr'
import NewHr from './english/humanResource/newHr'
import SingleHr from './english/humanResource/singleHr'
import EditHr from './english/humanResource/editHr'

import Academics from './english/academics/Academics'
import EditAcademics from './english/academics/EditAcademics'
import Grade9 from './english/academics/grade9'
import Grade10 from './english/academics/grade10'
import Grade11 from './english/academics/grade11'
import Grade12 from './english/academics/grade12'
import NewAcademics from './english/academics/NewAcademics'
import UpdateAcademicsContent from './english/academics/UpdateAcademicsContent'

// import Newacademics from './english/academics/newacademics'
// import Singleacademics from './english/academics/singleacademics'
// import Editacademics from './english/academics/editacademics'

// spanish
import NewSpanishCarousel from './spanish/carousel/NewCarousel'
import EditSpanishCarousel from './spanish/carousel/EditCarousel'
import CarolSpanish from './spanish/carousel/Carousel'
import NewSpanishEvent from './spanish/events/NewEvents'
import EventSpanish from './spanish/events/Events'
import EditSpanishEvent from './spanish/events/EditEvent'
import SingleSpanishEvent from './spanish/events/SingleEvent'
import NewSpanishFaculty from './spanish/Faculty/NewFaculty'
import FacultySpanish from './spanish/Faculty/Faculty'
import SingleSpanishFaculty from './spanish/Faculty/SingleFaculty'
import EditSpanishFaculty from './spanish/Faculty/EditFaculty'
import NewSpanishStudent from './spanish/student/NewStudent'
import AdmissionSpanish from './spanish/student/Admission'
import BullySpanish from './spanish/student/Bully'
import StudentSpanish from './spanish/student/Student'
import GenderSpanishPolicy from './spanish/student/GenderPolicy'
import NewSpanishLinks from './spanish/student/NewLinks'
import SingleSpanishLink from './spanish/student/SingleLink'
import NewSpanishPhoto from './spanish/gallery/NewPhoto'
import PhotoSpanish from './spanish/gallery/Photo'
import SingleSpanishPhoto from './spanish/gallery/SinglePhoto'
import EditSpanishPhoto from './spanish/gallery/EditPhoto'
import NewSpanishPartners from './spanish/partners/NewPartners'
import SpanishPartners from './spanish/partners/Partners'
import SingleSpanishPartners from './spanish/partners/SinglePartner'
import EditSpanishPartners from './spanish/partners/EditPartners'
import SpanishSchoolBoardMeeting from './spanish/schoolBoard/Main'
import NewSpanishBoardMeeting from './spanish/schoolBoard/NewBoardMeeting'
import SingleSpanishBoardMeeting from './spanish/schoolBoard/singleMain'
import SpanishSchoolBoardMember from './spanish/schoolBoard/Members'
import NewSpanishSchoolBoardMember from './spanish/schoolBoard/NewMembers'
import SingleSpanishSchoolBoardMember from './spanish/schoolBoard/SingleMembers'
import SpanishAbout from './spanish/about/About'
import EditSpanishAbout from './spanish/about/EditAbout'

import SpanishApplication from './spanish/application/Application'
import SpanishNewApplication from './spanish/application/NewApplication'
import SpanishSingleApplication from './spanish/application/SingleApplication'

import SpanishHR from './spanish/humanResource/Hr'
import SpanishNewHr from './spanish/humanResource/newHr'
import SpanishSingleHr from './spanish/humanResource/singleHr'
import SpanishEditHr from './spanish/humanResource/editHr'

// khmer
import NewkhmerCarousel from './khmer/carousel/NewCarousel'
import EditkhmerCarousel from './khmer/carousel/EditCarousel'
import Carolkhmer from './khmer/carousel/Carousel'
import NewkhmerEvent from './khmer/events/NewEvents'
import Eventkhmer from './khmer/events/Events'
import EditkhmerEvent from './khmer/events/EditEvent'
import SinglekhmerEvent from './khmer/events/SingleEvent'
import NewkhmerFaculty from './khmer/Faculty/NewFaculty'
import Facultykhmer from './khmer/Faculty/Faculty'
import SinglekhmerFaculty from './khmer/Faculty/SingleFaculty'
import EditkhmerFaculty from './khmer/Faculty/EditFaculty'
import NewkhmerStudent from './khmer/student/NewStudent'
import Admissionkhmer from './khmer/student/Admission'
import Bullykhmer from './khmer/student/Bully'
import Studentkhmer from './khmer/student/Student'
import GenderkhmerPolicy from './khmer/student/GenderPolicy'
import NewkhmerLinks from './khmer/student/NewLinks'
import SinglekhmerLink from './khmer/student/SingleLink'
import NewkhmerPhoto from './khmer/gallery/NewPhoto'
import Photokhmer from './khmer/gallery/Photo'
import SinglekhmerPhoto from './khmer/gallery/SinglePhoto'
import EditkhmerPhoto from './khmer/gallery/EditPhoto'
import NewkhmerPartners from './khmer/partners/NewPartners'
import khmerPartners from './khmer/partners/Partners'
import SinglekhmerPartners from './khmer/partners/SinglePartner'
import EditkhmerPartners from './khmer/partners/EditPartners'
import KhmerAbout from './khmer/about/About'
import EditkhmerAbout from './khmer/about/EditAbout'

import SingleKhmerBoardMeeting from './khmer/schoolBoard/singleMain'
import SingleKhmerSchoolBoardMember from './khmer/schoolBoard/SingleMembers'

import KhmerSchoolBoardMeeting from './khmer/schoolBoard/Main'
import KhmerSchoolBoardMember from './khmer/schoolBoard/Members'

import NewKhmerBoardMeeting from './khmer/schoolBoard/NewBoardMeeting'
import NewKhmerSchoolBoardMember from './khmer/schoolBoard/NewMembers'

import KhmerApplication from './khmer/application/Application'
import KhmerNewApplication from './khmer/application/NewApplication'
import KhmerSingleApplication from './khmer/application/SingleApplication'

import KhmerHR from './khmer/humanResource/Hr'
import KhmerNewHr from './khmer/humanResource/newHr'
import KhmerSingleHr from './khmer/humanResource/singleHr'
import KhmerEditHr from './khmer/humanResource/editHr'

// port
import NewportCarousel from './port/carousel/NewCarousel'
import EditportCarousel from './port/carousel/EditCarousel'
import Carolport from './port/carousel/Carousel'
import NewportEvent from './port/events/NewEvents'
import Eventport from './port/events/Events'
import EditportEvent from './port/events/EditEvent'
import SingleportEvent from './port/events/SingleEvent'
import NewportFaculty from './port/Faculty/NewFaculty'
import Facultyport from './port/Faculty/Faculty'
import SingleportFaculty from './port/Faculty/SingleFaculty'
import EditportFaculty from './port/Faculty/EditFaculty'
import NewportStudent from './port/student/NewStudent'
import Admissionport from './port/student/Admission'
import Bullyport from './port/student/Bully'
import Studentport from './port/student/Student'
import GenderportPolicy from './port/student/GenderPolicy'
import NewportLinks from './port/student/NewLinks'
import SingleportLink from './port/student/SingleLink'
import NewportPhoto from './port/gallery/NewPhoto'
import Photoport from './port/gallery/Photo'
import SingleportPhoto from './port/gallery/SinglePhoto'
import EditportPhoto from './port/gallery/EditPhoto'
import NewportPartners from './port/partners/NewPartners'
import portPartners from './port/partners/Partners'
import SingleportPartners from './port/partners/SinglePartner'
import EditportPartners from './port/partners/EditPartners'
import PortAbout from './port/about/About'
import EditportAbout from './port/about/EditAbout'

import SingleportBoardMeeting from './port/schoolBoard/singleMain'
import SingleportSchoolBoardMember from './port/schoolBoard/SingleMembers'

import portSchoolBoardMeeting from './port/schoolBoard/Main'
import portSchoolBoardMember from './port/schoolBoard/Members'

import NewportBoardMeeting from './port/schoolBoard/NewBoardMeeting'
import NewportSchoolBoardMember from './port/schoolBoard/NewMembers'

import portApplication from './port/application/Application'
import portNewApplication from './port/application/NewApplication'
import portSingleApplication from './port/application/SingleApplication'

import PortHR from './port/humanResource/Hr'
import PortNewHr from './port/humanResource/newHr'
import PortSingleHr from './port/humanResource/singleHr'
import PortEditHr from './port/humanResource/editHr'

const MainRouter = () => (
    <div >
        <Route render={({location}) => {
            return <div>
                <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    timeout={450}
                    classNames="fade"
                    >
                    <Switch location={location}>
                        {
                        //english          
                        }
                        <Route exact path="/" component={Carol}></Route>
                        <Route exact path="/signup" component={Signup}></Route>
                        <Route exact path="/signin" component={Signin}></Route>
                        <Route exact path="/forgot-password" component={ForgotPassword} />
                        <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword} />
                        <Route exact path="/new/carousel" component={NewCarousel}></Route>
                        <Route exact path="/edit/carousel/:carouselId" component={EditCarousel}></Route>
                        <Route exact path="/events/ui" component={Event}></Route>
                        <Route exact path="/new/event" component={NewEvent}></Route>
                        <Route exact path="/edit/event/:eventId" component={EditEvent}></Route>
                        <Route exact path="/event/:eventId" component={SingleEvent}></Route>
                        <Route exact path="/new/faculty/ui" component={NewFaculty}></Route>
                        <Route exact path="/faculty/ui" component={Faculty}></Route>
                        <Route exact path="/faculty/ui/:facultyId" component={SingleFaculty}></Route>
                        <Route exact path="/edit/faculty/ui/:facultyId" component={EditFaculty}></Route>
                        <Route exact path="/new/student" component={NewStudent}></Route>
                        <Route exact path="/admiss" component={Admission}></Route>
                        <Route exact path="/bully" component={Bully}></Route>
                        <Route exact path="/student" component={Student}></Route>
                        <Route exact path="/applicants" component={Applicants}></Route>
                        <Route exact path="/applicants/:applicantId" component={SingleApplicant}></Route>

                        <Route exact path="/genderpolicy" component={GenderPolicy}></Route>
                        <Route exact path="/newlink" component={NewLinks}></Route>
                        <Route exact path="/link/:linkId" component={SingleLink}></Route>
                        <Route exact path="/new/image" component={NewPhoto}></Route>
                        <Route exact path="/images" component={Photo}></Route>
                        <Route exact path="/image/:imageId" component={SinglePhoto}></Route>
                        <Route exact path="/edit/image/:imageId" component={EditPhoto}></Route>
                        <Route exact path="/partners" component={Partners}></Route>
                        <Route exact path="/new/partners" component={NewPartners}></Route>
                        <Route exact path="/partner" component={SinglePartners}></Route>
                        <Route exact path="/edit/partner/:partnersId" component={EditPartners}></Route>
                        <Route exact path="/partners/:partnersId" component={SinglePartners}></Route>
                        
                        <Route exact path="/schoolBoardMeeting/ui" component={SchoolBoardMeeting}></Route>
                        <Route exact path="/newschoolBoardMeeting" component={NewBoardMeeting}></Route>
                        <Route exact path="/schoolBoardMeeting/:schoolBoardMeetingId" component={SingleBoardMeeting}></Route>
                        <Route exact path="/edit/schoolBoardMeeting/:schoolBoardMeetingsId" component={UpdatechoolBoardMeeting}></Route>

                        <Route exact path="/schoolBoardMember/ui" component={SchoolBoardMember}></Route>
                        <Route exact path="/new/schoolBoardMember" component={NewSchoolBoardMember}></Route>
                        <Route exact path="/schoolBoardMember/:schoolBoardMemberId" component={SingleSchoolBoardMember}></Route>
                        
                        <Route exact path="/abo" component={About}></Route>
                        <Route exact path="/edit/about/:aboutId" component={EditAbout}></Route>
                        
                        <Route exact path="/application/ui" component={Applications}></Route>
                        <Route exact path="/new/application/ui" component={NewApplication}></Route>
                        <Route exact path="/application/ui/:applicationId" component={SingleApplication}></Route>

                        <Route exact path="/edit/hr/:hrId" component={EditHr}></Route>
                        <Route exact path="/hr" component={HR}></Route>
                        <Route exact path="/new/hr" component={NewHr}></Route>
                        <Route exact path="/hr/:hrId" component={SingleHr}></Route>

                        <Route exact path="/aca" component={Academics}></Route>
                        <Route exact path="/content/new" component={NewAcademics}></Route>
                        <Route exact path="/update/content/ui/:linkId" component={UpdateAcademicsContent}></Route>

                        <Route exact path="/update/academics/:academicsId" component={EditAcademics}></Route>
                        <Route exact path="/grade9" component={Grade9}></Route>
                        <Route exact path="/grade10" component={Grade10}></Route>
                        <Route exact path="/grade11" component={Grade11}></Route>
                        <Route exact path="/grade12" component={Grade12}></Route>


                        {
                        // spanish          
                        }
                        <Route exact path="/spanish/signup" component={SpanishSignup}></Route>
                        <Route exact path="/spanish/signin" component={SpanishSignin}></Route>
                        <Route exact path="/spanish" component={CarolSpanish}></Route>
                        <Route exact path="/spanish/new/carousel" component={NewSpanishCarousel}></Route>
                        <Route exact path="/spanish/edit/carousel/:carouselId" component={EditSpanishCarousel}></Route>
                        <Route exact path="/spanishevents" component={EventSpanish}></Route>
                        <Route exact path="/spanish/new/event" component={NewSpanishEvent}></Route>
                        <Route exact path="/spanish/edit/event/:eventId" component={EditSpanishEvent}></Route>
                        <Route exact path="/spanish/event/:eventId" component={SingleSpanishEvent}></Route>
                        <Route exact path="/spanish/new/faculty" component={NewSpanishFaculty}></Route>
                        <Route exact path="/spanish/faculty" component={FacultySpanish}></Route>
                        <Route exact path="/spanish/faculty/:facultyId" component={SingleSpanishFaculty}></Route>
                        <Route exact path="/spanish/edit/faculty/:facultyId" component={EditSpanishFaculty}></Route>
                        <Route exact path="/spanish/new/student" component={NewSpanishStudent}></Route>
                        <Route exact path="/spanish/admission" component={AdmissionSpanish}></Route>
                        <Route exact path="/spanish/bully" component={BullySpanish}></Route>
                        <Route exact path="/spanish/student" component={StudentSpanish}></Route>
                        <Route exact path="/spanish/genderpolicy" component={GenderSpanishPolicy}></Route>
                        <Route exact path="/spanish/newlink" component={NewSpanishLinks}></Route>
                        <Route exact path="/spanish/link/:linkId" component={SingleSpanishLink}></Route>
                        <Route exact path="/spanish/new/image" component={NewSpanishPhoto}></Route>
                        <Route exact path="/spanish/images" component={PhotoSpanish}></Route>
                        <Route exact path="/spanish/image/:imageId" component={SingleSpanishPhoto}></Route>
                        <Route exact path="/spanish/edit/image/:imageId" component={EditSpanishPhoto}></Route>
                        <Route exact path="/spanish/partners" component={SpanishPartners}></Route>
                        <Route exact path="/spanish/new/partners" component={NewSpanishPartners}></Route>
                        <Route exact path="/spanish/partner" component={SingleSpanishPartners}></Route>
                        <Route exact path="/spanish/edit/partner/:partnersId" component={EditSpanishPartners}></Route>
                        <Route exact path="/spanish/partners/:partnersId" component={SingleSpanishPartners}></Route>
                        
                        <Route exact path="/spanish/schoolBoardMeeting" component={SpanishSchoolBoardMeeting}></Route>
                        <Route exact path="/spanish/newschoolBoardMeeting" component={NewSpanishBoardMeeting}></Route>
                        <Route exact path="/spanish/schoolBoardMeeting/:schoolBoardMeetingId" component={SingleSpanishBoardMeeting}></Route>
                        
                        <Route exact path="/spanish/schoolBoardMember" component={SpanishSchoolBoardMember}></Route>
                        <Route exact path="/spanish/new/schoolBoardMember" component={NewSpanishSchoolBoardMember}></Route>
                        <Route exact path="/spanish/schoolBoardMember/:schoolBoardMemberId" component={SingleSpanishSchoolBoardMember}></Route>
                        
                        <Route exact path="/spanish/about" component={SpanishAbout}></Route>
                        <Route exact path="/spanish/edit/about/:aboutId" component={EditSpanishAbout}></Route>

                        <Route exact path="/spanish/new/application" component={SpanishNewApplication}></Route>
                        <Route exact path="/application" component={SpanishApplication}></Route>
                        <Route exact path="/spanish/application/:applicationId" component={SpanishSingleApplication}></Route>

                        <Route exact path="/spanish/edit/hr/:hrId" component={SpanishEditHr}></Route>
                        <Route exact path="/spanish/hr" component={SpanishHR}></Route>
                        <Route exact path="/spanish/new/hr" component={SpanishNewHr}></Route>
                        <Route exact path="/spanish/hr/:hrId" component={SpanishSingleHr}></Route>


                        {
                        // khmer          
                        }
                        <Route exact path="/khmer/signup" component={khmerSignUp}></Route>
                        <Route exact path="/khmer/signin" component={khmerSignIn}></Route>
                        <Route exact path="/khmer" component={Carolkhmer}></Route>
                        <Route exact path="/khmer/new/carousel" component={NewkhmerCarousel}></Route>
                        <Route exact path="/khmer/edit/carousel/:carouselId" component={EditkhmerCarousel}></Route>
                        <Route exact path="/khmerevents" component={Eventkhmer}></Route>
                        <Route exact path="/khmer/new/event" component={NewkhmerEvent}></Route>
                        <Route exact path="/khmer/edit/event/:eventId" component={EditkhmerEvent}></Route>
                        <Route exact path="/khmer/event/:eventId" component={SinglekhmerEvent}></Route>
                        <Route exact path="/khmer/new/faculty" component={NewkhmerFaculty}></Route>
                        <Route exact path="/khmer/faculty" component={Facultykhmer}></Route>
                        <Route exact path="/khmer/faculty/:facultyId" component={SinglekhmerFaculty}></Route>
                        <Route exact path="/khmer/edit/faculty/:facultyId" component={EditkhmerFaculty}></Route>
                        <Route exact path="/khmer/new/student" component={NewkhmerStudent}></Route>
                        <Route exact path="/khmer/admission" component={Admissionkhmer}></Route>
                        <Route exact path="/khmer/bully" component={Bullykhmer}></Route>
                        <Route exact path="/khmer/student" component={Studentkhmer}></Route>
                        <Route exact path="/khmer/genderpolicy" component={GenderkhmerPolicy}></Route>
                        <Route exact path="/khmer/newlink" component={NewkhmerLinks}></Route>
                        <Route exact path="/khmer/link/:linkId" component={SinglekhmerLink}></Route>
                        <Route exact path="/khmer/new/image" component={NewkhmerPhoto}></Route>
                        <Route exact path="/khmer/images" component={Photokhmer}></Route>
                        <Route exact path="/khmer/image/:imageId" component={SinglekhmerPhoto}></Route>
                        <Route exact path="/khmer/edit/image/:imageId" component={EditkhmerPhoto}></Route>
                        <Route exact path="/khmer/partners" component={khmerPartners}></Route>
                        <Route exact path="/khmer/new/partners" component={NewkhmerPartners}></Route>
                        <Route exact path="/khmer/partner" component={SinglekhmerPartners}></Route>
                        <Route exact path="/khmer/edit/partner/:partnersId" component={EditkhmerPartners}></Route>
                        <Route exact path="/khmer/partners/:partnersId" component={SinglekhmerPartners}></Route>
                        <Route exact path="/khmer/about" component={KhmerAbout}></Route>
                        <Route exact path="/khmer/edit/about/:aboutId" component={EditkhmerAbout}></Route>
                        <Route exact path="/khmer/schoolBoardMeeting" component={KhmerSchoolBoardMeeting}></Route>
                        <Route exact path="/khmer/newschoolBoardMeeting" component={NewKhmerBoardMeeting}></Route>
                        <Route exact path="/khmer/schoolBoardMeeting/:schoolBoardMeetingId" component={SingleKhmerBoardMeeting}></Route>
                        
                        <Route exact path="/khmer/schoolBoardMember" component={KhmerSchoolBoardMember}></Route>
                        <Route exact path="/khmer/new/schoolBoardMember" component={NewKhmerSchoolBoardMember}></Route>
                        <Route exact path="/khmer/schoolBoardMember/:schoolBoardMemberId" component={SingleKhmerSchoolBoardMember}></Route>
                        <Route exact path="/khmer/new/application" component={KhmerNewApplication}></Route>
                        <Route exact path="/khmer/application" component={KhmerApplication}></Route>
                        <Route exact path="/khmer/application/:applicationId" component={KhmerSingleApplication}></Route>

                        <Route exact path="/khmer/edit/hr/:hrId" component={KhmerEditHr}></Route>
                        <Route exact path="/khmer/hr" component={KhmerHR}></Route>
                        <Route exact path="/khmer/new/hr" component={KhmerNewHr}></Route>
                        <Route exact path="/khmer/hr/:hrId" component={KhmerSingleHr}></Route> 

                        {
                        // port          
                        }
                        <Route exact path="/port/signup" component={PortSignUp}></Route>
                        <Route exact path="/port/signin" component={PortSignIn}></Route>
                        <Route exact path="/port" component={Carolport}></Route>
                        <Route exact path="/port/new/carousel" component={NewportCarousel}></Route>
                        <Route exact path="/port/edit/carousel/:carouselId" component={EditportCarousel}></Route>
                        <Route exact path="/port/events" component={Eventport}></Route>
                        <Route exact path="/port/new/event" component={NewportEvent}></Route>
                        <Route exact path="/port/edit/event/:eventId" component={EditportEvent}></Route>
                        <Route exact path="/port/event/:eventId" component={SingleportEvent}></Route>
                        <Route exact path="/port/new/faculty" component={NewportFaculty}></Route>
                        <Route exact path="/port/faculty" component={Facultyport}></Route>
                        <Route exact path="/port/faculty/:facultyId" component={SingleportFaculty}></Route>
                        <Route exact path="/port/edit/faculty/:facultyId" component={EditportFaculty}></Route>
                        <Route exact path="/port/new/student" component={NewportStudent}></Route>
                        <Route exact path="/port/admission" component={Admissionport}></Route>
                        <Route exact path="/port/bully" component={Bullyport}></Route>
                        <Route exact path="/port/student" component={Studentport}></Route>
                        <Route exact path="/port/genderpolicy" component={GenderportPolicy}></Route>
                        <Route exact path="/port/newlink" component={NewportLinks}></Route>
                        <Route exact path="/port/link/:linkId" component={SingleportLink}></Route>
                        <Route exact path="/port/new/image" component={NewportPhoto}></Route>
                        <Route exact path="/port/images" component={Photoport}></Route>
                        <Route exact path="/port/image/:imageId" component={SingleportPhoto}></Route>
                        <Route exact path="/port/edit/image/:imageId" component={EditportPhoto}></Route>
                        <Route exact path="/port/partners" component={portPartners}></Route>
                        <Route exact path="/port/new/partners" component={NewportPartners}></Route>
                        <Route exact path="/port/partner" component={SingleportPartners}></Route>
                        <Route exact path="/port/edit/partner/:partnersId" component={EditportPartners}></Route>
                        <Route exact path="/port/partners/:partnersId" component={SingleportPartners}></Route>
                        <Route exact path="/port/about" component={PortAbout}></Route>
                        <Route exact path="/port/edit/about/:aboutId" component={EditportAbout}></Route>
                        <Route exact path="/port/schoolBoardMeeting" component={portSchoolBoardMeeting}></Route>
                        <Route exact path="/port/newschoolBoardMeeting" component={NewportBoardMeeting}></Route>
                        <Route exact path="/port/schoolBoardMeeting/:schoolBoardMeetingId" component={SingleportBoardMeeting}></Route>
                        
                        <Route exact path="/port/schoolBoardMember" component={portSchoolBoardMember}></Route>
                        <Route exact path="/port/new/schoolBoardMember" component={NewportSchoolBoardMember}></Route>
                        <Route exact path="/port/schoolBoardMember/:schoolBoardMemberId" component={SingleportSchoolBoardMember}></Route>
                        <Route exact path="/port/new/application" component={portNewApplication}></Route>
                        <Route exact path="/port/application" component={portApplication}></Route>
                        <Route exact path="/port/application/:applicationId" component={portSingleApplication}></Route>

                        <Route exact path="/port/edit/hr/:hrId" component={PortEditHr}></Route>
                        <Route exact path="/port/hr" component={PortHR}></Route>
                        <Route exact path="/port/new/hr" component={PortNewHr}></Route>
                        <Route exact path="/port/hr/:hrId" component={PortSingleHr}></Route> 

                    </Switch>
                </CSSTransition>
            </TransitionGroup>
            </div>
        
        }} />
    </div>
)

export default MainRouter;