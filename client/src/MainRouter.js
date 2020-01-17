import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Signup from './user/SignUp'
import Signin from './user/SignIn'

import SpanishSignup from './user/SpanishSignUp'
import SpanishSignin from './user/SpanishSignin'

import khmerSignUp from './user/khmerSignUp'
import khmerSignIn from './user/khmerSignIn'

import Home from './core/Home'
import Menu from './core/Menu'
import Header from './core/Header'
import TopHeader from './core/TopHeader'

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
import SchoolBoardMember from './english/schoolBoard/Members'
import NewSchoolBoardMember from './english/schoolBoard/NewMembers'
import SingleSchoolBoardMember from './english/schoolBoard/SingleMembers'
import About from './english/about/About'
import EditAbout from './english/about/EditAbout'

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
import SchoolBoardMeeting from './spanish/schoolBoard/Main'
import NewBoardMeeting from './spanish/schoolBoard/NewBoardMeeting'
import SingleBoardMeeting from './spanish/schoolBoard/singleMain'
import SpanishSchoolBoardMember from './spanish/schoolBoard/Members'
import NewSpanishSchoolBoardMember from './spanish/schoolBoard/NewMembers'
import SingleSpanishSchoolBoardMember from './spanish/schoolBoard/SingleMembers'
import SpanishAbout from './spanish/about/About'
import EditSpanishAbout from './spanish/about/EditAbout'


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

const MainRouter = () => (
    <div >
        {/* <TopHeader/> */}
        {/* <Menu /> */}
        <Switch>
            {
            //english          
            }
            <Route exact path="/" component={Carol}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/signin" component={Signin}></Route>
            
            <Route exact path="/new/carousel" component={NewCarousel}></Route>
            <Route exact path="/edit/carousel/:carouselId" component={EditCarousel}></Route>
            <Route exact path="/events" component={Event}></Route>
            <Route exact path="/new/event" component={NewEvent}></Route>
            <Route exact path="/edit/event/:eventId" component={EditEvent}></Route>
            <Route exact path="/event/:eventId" component={SingleEvent}></Route>
            <Route exact path="/new/faculty" component={NewFaculty}></Route>
            <Route exact path="/faculty" component={Faculty}></Route>
            <Route exact path="/faculty/:facultyId" component={SingleFaculty}></Route>
            <Route exact path="/edit/faculty/:facultyId" component={EditFaculty}></Route>
            <Route exact path="/new/student" component={NewStudent}></Route>
            <Route exact path="/admission" component={Admission}></Route>
            <Route exact path="/bully" component={Bully}></Route>
            <Route exact path="/student" component={Student}></Route>
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
            <Route exact path="/schoolBoardMeeting" component={SchoolBoardMeeting}></Route>
            <Route exact path="/newschoolBoardMeeting" component={NewBoardMeeting}></Route>
            <Route exact path="/schoolBoardMeeting/:schoolBoardMeetingId" component={SingleBoardMeeting}></Route>
            <Route exact path="/schoolBoardMember" component={SchoolBoardMember}></Route>
            <Route exact path="/new/schoolBoardMember" component={NewSchoolBoardMember}></Route>
            <Route exact path="/schoolBoardMember/:schoolBoardMemberId" component={SingleSchoolBoardMember}></Route>
            <Route exact path="/about" component={About}></Route>
            <Route exact path="/edit/about/:aboutId" component={EditAbout}></Route>


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
            <Route exact path="/schoolBoardMeeting" component={SchoolBoardMeeting}></Route>
            <Route exact path="/newschoolBoardMeeting" component={NewBoardMeeting}></Route>
            <Route exact path="/spanish/schoolBoardMeeting/:schoolBoardMeetingId" component={SingleBoardMeeting}></Route>
            <Route exact path="/spanish/schoolBoardMember" component={SchoolBoardMember}></Route>
            <Route exact path="/spanish/new/schoolBoardMember" component={NewSchoolBoardMember}></Route>
            <Route exact path="/spanish/schoolBoardMember/:schoolBoardMemberId" component={SingleSchoolBoardMember}></Route>
            <Route exact path="/spanish/about" component={About}></Route>
            <Route exact path="/spanish/edit/about/:aboutId" component={EditAbout}></Route>


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
        </Switch>
        
    </div>
)

export default MainRouter;