import { Authorized, Body, Get, JsonController, Param, Post } from "routing-controllers";
import { Event } from "../model/event.entity";
import { User } from "../model/user.entity";
import { WithSessionUser } from "../providers/authorization";
import { eventService } from "../service/eventService";
import { CreateEventDTO } from "./dto/EventDTO";

@JsonController("/events")
export class EventController {
  @Post("/")
  @Authorized()
  public async createEvent(@Body() payload: CreateEventDTO, @WithSessionUser() sessionUser: User): Promise<Event> {
    return await eventService.createOrUpdateEvent(payload.name, sessionUser);
  }

  @Get("/:id")
  @Authorized()
  public async getEventInfo(@Param("id") id: number) {
    return await eventService.getEvent(id);
  }
}