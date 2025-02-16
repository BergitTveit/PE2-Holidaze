// // import { IBooking } from '../../types/booking';
// // import BookingGrid from './BookingGrid';

import { IBooking } from '../../types/booking';
import { IProfile } from '../../types/profile';
import { IVenue } from '../../types/venue';
import BookingCard from './BookingCard';
import VenueBookingCard from './VenueBookingCard';

// import { IBooking } from '../../types/booking';
// import { IVenue } from '../../types/venue';
// import BookingCard from './BookingCard';
// import VenueBookingCard from './VenueBookingCard';

// // interface BookingManagementSectionProps {
// //   bookings: IBooking[];
// //   isOwner: boolean;
// //   title: string;
// // }

// // const BookingManagementSection = ({ bookings, title, isOwner }: BookingManagementSectionProps) => {
// //   return (
// //     <section className="mt-8 p-4 border-t border-gray-200">
// //       <div className="flex justify-between items-center mb-6">
// //       <h2 className="text-xl font-bold">{title}</h2>
// //       </div>
// //       <BookingGrid bookings={bookings} isOwner={isOwner} />
// //     </section>
// //   );
// // };

// // export default BookingManagementSection;

// // components/bookings/BookingManagementSection.tsx

// interface BookingManagementSectionProps {
//   bookings: IBooking[];
//   type: 'userBookings' | 'venueBookings';
//   title: string;
//   venue: IVenue;
// }

// const BookingManagementSection = ({
//   bookings,
//   type,
//   title,
//   venue,
// }: BookingManagementSectionProps) => {
//   const BookingComponent = type === 'userBookings' ? BookingCard : VenueBookingCard;

//   return (
//     <section className="mt-8 p-4 border-t border-gray-200">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-bold">{title}</h2>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {bookings.map((booking) => (
//           <BookingComponent key={booking.id} booking={booking} venue={venue} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default BookingManagementSection;
// interface BookingManagementSectionProps {
//   venuesWithBookings?: IVenue[];
//   userBookings?: IBooking[];
//   profileOwner?: IProfile;
//   type: 'userBookings' | 'venueBookings';
// }

// const BookingManagementSection = ({
//   venuesWithBookings = [],
//   userBookings = [],
//   profileOwner,
//   type,
// }: BookingManagementSectionProps) => {
//   const BookingComponent = type === 'userBookings' ? BookingCard : VenueBookingCard;

//   if (type === 'venueBookings') {
//     return (
//       <>
//         {venuesWithBookings.map((venue) => {
//             const bookingsWithOwner = venue.bookings.map(booking => ({
//             ...booking,
//             venue: {
//               ...venue,
//               owner: profileOwner
//             }
//           }));

//           return (
//             <section key={venue.id} className="mt-8 p-4 border-t border-gray-200">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-bold">Bookings for {venue.name}</h2>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {bookingsWithOwner.map((booking) => (
//                   <BookingComponent
//                     key={booking.id}
//                     booking={booking}
//                     venue={venue}
//                   />
//                 ))}
//               </div>
//             </section>
//           );
//         })}
//       </>
//     );
//   }

//   return (
//     <section className="mt-8 p-4 border-t border-gray-200">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-bold">My Bookings</h2>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {userBookings.map((booking) => (
//           <BookingComponent
//             key={booking.id}
//             booking={booking}
//             venue={booking.venue}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

interface BookingManagementSectionProps {
  venues: IVenue[];
}

const BookingManagementSection = ({ venues }: BookingManagementSectionProps) => {
  return (
    <>
      {venues.map((venue) => (
        <section key={venue.id} className="mt-8 p-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Bookings for {venue.name}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venue.bookings.map((booking) => (
              <VenueBookingCard key={booking.id} booking={booking} venue={venue} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
};

export default BookingManagementSection;
