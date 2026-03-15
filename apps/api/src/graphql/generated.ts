import type { GraphQLResolveInfo } from 'graphql';
import type { Hotel } from '../entities/hotel/hotel.types';
import type { Room } from '../entities/room/room.types';
import type { Booking } from '../entities/booking/booking.types';
import type { Context } from './resolvers';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type GqlBooking = {
  __typename?: 'Booking';
  checkIn: Scalars['String']['output'];
  checkOut: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  room: GqlRoom;
  roomId: Scalars['ID']['output'];
  status: GqlBookingStatus;
  updatedAt: Scalars['String']['output'];
};

export enum GqlBookingStatus {
  Avaliable = 'avaliable',
  Busy = 'busy'
}

export type GqlHotel = {
  __typename?: 'Hotel';
  address: Scalars['String']['output'];
  city: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  rooms: Array<GqlRoom>;
  roomsCount: Scalars['Int']['output'];
};

export type GqlMutation = {
  __typename?: 'Mutation';
  cancelBooking: Scalars['Boolean']['output'];
  confirmBooking: Scalars['Boolean']['output'];
  createBooking: GqlBooking;
};


export type GqlMutationCancelBookingArgs = {
  bookingId: Scalars['ID']['input'];
};


export type GqlMutationConfirmBookingArgs = {
  bookingId: Scalars['ID']['input'];
};


export type GqlMutationCreateBookingArgs = {
  checkIn: Scalars['String']['input'];
  checkOut: Scalars['String']['input'];
  roomId: Scalars['ID']['input'];
};

export type GqlQuery = {
  __typename?: 'Query';
  booking?: Maybe<GqlBooking>;
  bookings: Array<GqlBooking>;
  hotel?: Maybe<GqlHotel>;
  hotels: Array<GqlHotel>;
  room?: Maybe<GqlRoom>;
  rooms: Array<GqlRoom>;
};


export type GqlQueryBookingArgs = {
  id: Scalars['ID']['input'];
};


export type GqlQueryBookingsArgs = {
  roomId: Scalars['ID']['input'];
};


export type GqlQueryHotelArgs = {
  id: Scalars['ID']['input'];
};


export type GqlQueryRoomArgs = {
  id: Scalars['ID']['input'];
};


export type GqlQueryRoomsArgs = {
  hotelId: Scalars['ID']['input'];
};

export type GqlRoom = {
  __typename?: 'Room';
  bookings: Array<GqlBooking>;
  capacity: Scalars['Int']['output'];
  createdAt: Scalars['String']['output'];
  hotel: GqlHotel;
  hotelId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  isAvailable: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  pricePerNight: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};


export type GqlRoomIsAvailableArgs = {
  checkIn?: InputMaybe<Scalars['String']['input']>;
  checkOut?: InputMaybe<Scalars['String']['input']>;
};

export type GqlSubscription = {
  __typename?: 'Subscription';
  bookingStatusChanged: GqlBooking;
};


export type GqlSubscriptionBookingStatusChangedArgs = {
  roomId: Scalars['ID']['input'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type GqlResolversTypes = ResolversObject<{
  Booking: ResolverTypeWrapper<Booking>;
  BookingStatus: GqlBookingStatus;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Hotel: ResolverTypeWrapper<Hotel>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Room: ResolverTypeWrapper<Room>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<Record<PropertyKey, never>>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type GqlResolversParentTypes = ResolversObject<{
  Booking: Booking;
  Boolean: Scalars['Boolean']['output'];
  Hotel: Hotel;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  Room: Room;
  String: Scalars['String']['output'];
  Subscription: Record<PropertyKey, never>;
}>;

export type GqlBookingResolvers<ContextType = Context, ParentType extends GqlResolversParentTypes['Booking'] = GqlResolversParentTypes['Booking']> = ResolversObject<{
  checkIn?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  checkOut?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  room?: Resolver<GqlResolversTypes['Room'], ParentType, ContextType>;
  roomId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  status?: Resolver<GqlResolversTypes['BookingStatus'], ParentType, ContextType>;
  updatedAt?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
}>;

export type GqlHotelResolvers<ContextType = Context, ParentType extends GqlResolversParentTypes['Hotel'] = GqlResolversParentTypes['Hotel']> = ResolversObject<{
  address?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  city?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  rooms?: Resolver<Array<GqlResolversTypes['Room']>, ParentType, ContextType>;
  roomsCount?: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
}>;

export type GqlMutationResolvers<ContextType = Context, ParentType extends GqlResolversParentTypes['Mutation'] = GqlResolversParentTypes['Mutation']> = ResolversObject<{
  cancelBooking?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GqlMutationCancelBookingArgs, 'bookingId'>>;
  confirmBooking?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GqlMutationConfirmBookingArgs, 'bookingId'>>;
  createBooking?: Resolver<GqlResolversTypes['Booking'], ParentType, ContextType, RequireFields<GqlMutationCreateBookingArgs, 'checkIn' | 'checkOut' | 'roomId'>>;
}>;

export type GqlQueryResolvers<ContextType = Context, ParentType extends GqlResolversParentTypes['Query'] = GqlResolversParentTypes['Query']> = ResolversObject<{
  booking?: Resolver<Maybe<GqlResolversTypes['Booking']>, ParentType, ContextType, RequireFields<GqlQueryBookingArgs, 'id'>>;
  bookings?: Resolver<Array<GqlResolversTypes['Booking']>, ParentType, ContextType, RequireFields<GqlQueryBookingsArgs, 'roomId'>>;
  hotel?: Resolver<Maybe<GqlResolversTypes['Hotel']>, ParentType, ContextType, RequireFields<GqlQueryHotelArgs, 'id'>>;
  hotels?: Resolver<Array<GqlResolversTypes['Hotel']>, ParentType, ContextType>;
  room?: Resolver<Maybe<GqlResolversTypes['Room']>, ParentType, ContextType, RequireFields<GqlQueryRoomArgs, 'id'>>;
  rooms?: Resolver<Array<GqlResolversTypes['Room']>, ParentType, ContextType, RequireFields<GqlQueryRoomsArgs, 'hotelId'>>;
}>;

export type GqlRoomResolvers<ContextType = Context, ParentType extends GqlResolversParentTypes['Room'] = GqlResolversParentTypes['Room']> = ResolversObject<{
  bookings?: Resolver<Array<GqlResolversTypes['Booking']>, ParentType, ContextType>;
  capacity?: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  hotel?: Resolver<GqlResolversTypes['Hotel'], ParentType, ContextType>;
  hotelId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  isAvailable?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType, Partial<GqlRoomIsAvailableArgs>>;
  name?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  pricePerNight?: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
}>;

export type GqlSubscriptionResolvers<ContextType = Context, ParentType extends GqlResolversParentTypes['Subscription'] = GqlResolversParentTypes['Subscription']> = ResolversObject<{
  bookingStatusChanged?: SubscriptionResolver<GqlResolversTypes['Booking'], "bookingStatusChanged", ParentType, ContextType, RequireFields<GqlSubscriptionBookingStatusChangedArgs, 'roomId'>>;
}>;

export type GqlResolvers<ContextType = Context> = ResolversObject<{
  Booking?: GqlBookingResolvers<ContextType>;
  Hotel?: GqlHotelResolvers<ContextType>;
  Mutation?: GqlMutationResolvers<ContextType>;
  Query?: GqlQueryResolvers<ContextType>;
  Room?: GqlRoomResolvers<ContextType>;
  Subscription?: GqlSubscriptionResolvers<ContextType>;
}>;

