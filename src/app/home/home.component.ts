import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { SyncUpDataService } from '../sync-up-data.service';

export interface Event {
  title: string;
  description: string;
  start: string;
  end: string;
}

export interface Friend {
  first_name: string;
  last_name: string;
  birthday: string;
  phone_number: number;
  email: string;
  close_friend: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SyncUpDataService]
})
export class HomeComponent implements OnInit{
  constructor (private syncUpDataService: SyncUpDataService) {}

  events: Event[] = [];
  private getEvents(): void {
    this.syncUpDataService.getEvents().then(events => {
      this.events = events;
      this.calendarOptions.events = this.events;
    });
  }

  friends: Friend[] = [];
  private getFriends(): void {
    this.syncUpDataService.getFriends().then(friends => this.friends = friends);
  }

  ngOnInit(): void {
    this.getEvents();
    this.getFriends();
  }

  calendarOptions: CalendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin,timeGridPlugin,interactionPlugin],
      headerToolbar: {
        left: 'prev,next today addEventButton',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      customButtons: {
        addEventButton: {
          text: 'add event',
          click: () => {
            console.log('Add Event button clicked!');
          }
        }
      },
      editable: true,
      events: [],
      eventTextColor: 'white',
      eventBackgroundColor: '#d6711e',
      eventBorderColor: '#d6711e',
      handleWindowResize: true
    };
    
  @ViewChild('fullcalendar') fullcalendar!: FullCalendarComponent;

  ngAfterViewInit() {
    if (this.fullcalendar) {
      this.fullcalendar.getApi().render();
    }
  }
}

