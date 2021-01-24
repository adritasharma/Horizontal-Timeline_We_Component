import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'horizontal-timeline',
  templateUrl: './horizontal-timeline.component.html',
  styleUrls: ['./horizontal-timeline.component.css']
})
export class HorizontalTimelineComponent implements OnInit {

  constructor() { }

  datesStrings = ['01/01/2020', '01/01/2021','01/01/2022', '01/01/2023']
  eventsMinDistance: number = 150;

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    let timelineDates = this.datesStrings.map(x => new Date(x));
    let eventsMinLapse = this.minLapse(timelineDates);

    //assign a left postion to the single events along the timeline
    this.setDatePosition(timelineDates, eventsMinLapse);

    //assign a width to the timeline
    let timelineTotWidth = this.setTimelineWidth(timelineDates, this.eventsMinDistance, eventsMinLapse);

    //the timeline has been initialize - show it
    document.getElementById('cd-horizontal-timeline').classList.add('loaded')
    debugger
  }

  minLapse(dates) {
    //determine the minimum distance among events
    var dateDistances = [];

    for (let i = 1; i < dates.length; i++) {
      var distance = this.daydiff(dates[i - 1], dates[i]);
      dateDistances.push(distance);
    }
    return Math.min.apply(null, dateDistances);
  }

  daydiff(first, second) {
    return Math.round((second - first));
  }

  setDatePosition(timelineDates, eventsMinLapse) {
    let dateAnchorElements: any = document.querySelectorAll('#cd-horizontal-timeline a');

    for (let i = 0; i < timelineDates.length; i++) {
      var distance = this.daydiff(timelineDates[0], timelineDates[i]);
      let distanceNorm = Math.round(distance / eventsMinLapse) + 2;
      dateAnchorElements[i].style.left = (distanceNorm * this.eventsMinDistance) + 'px';
    }
  }

  setTimelineWidth(timelineDates, width, eventsMinLapse) {
    var timeSpan = this.daydiff(timelineDates[0], timelineDates[timelineDates.length - 1]);
    let timeSpanNorm = timeSpan / eventsMinLapse;
    timeSpanNorm = Math.round(timeSpanNorm) + 4;
    let totalWidth = timeSpanNorm * width;

    let eventsEl = document.getElementById('events')
    eventsEl.style.width = totalWidth + 'px';

    let dateAnchorElements: any = document.querySelectorAll('#cd-horizontal-timeline a')


    this.updateFilling(dateAnchorElements[0], document.getElementById('filling-line'), totalWidth);


    // for (let i = 0; i < dateAnchorElements.length; i++) {
    //   this.updateFilling(dateAnchorElements[i], document.getElementById('filling-line'), totalWidth);
    // }
    return totalWidth;
  }

  updateFilling(selectedEvent, filling, totWidth) {
    //change .filling-line length according to the selected event
    var eventStyle = window.getComputedStyle(selectedEvent, null);
    let eventLeft: any = eventStyle.getPropertyValue("left"),
      eventWidth = eventStyle.getPropertyValue("width");
    eventLeft = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', '')) / 2;
    var scaleValue = eventLeft / totWidth;
    this.setTransformValue(filling, 'scaleX', scaleValue);
  }

  setTransformValue(element, property, value) {
    element.style["-webkit-transform"] = property + "(" + value + ")";
    element.style["-moz-transform"] = property + "(" + value + ")";
    element.style["-ms-transform"] = property + "(" + value + ")";
    element.style["-o-transform"] = property + "(" + value + ")";
    element.style["transform"] = property + "(" + value + ")";
  }

}
