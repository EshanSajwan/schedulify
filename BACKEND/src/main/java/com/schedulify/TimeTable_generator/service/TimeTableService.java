package com.schedulify.TimeTable_generator.service;

import com.schedulify.TimeTable_generator.dto.TimeTableRequest;
import com.schedulify.TimeTable_generator.dto.TimeTableResponse;
import java.util.List;

public interface TimeTableService {

    public TimeTableResponse create(TimeTableRequest timeTableRequest) ;

    public List<TimeTableResponse> getAll() ;

}
