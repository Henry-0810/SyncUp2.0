import { Component, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SyncUpDataService]
})
export class HomeComponent {
  constructor (private syncUpDataService: SyncUpDataService) {}
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
      events: [
        // Your event data here...
      ],
      // customize event style
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

