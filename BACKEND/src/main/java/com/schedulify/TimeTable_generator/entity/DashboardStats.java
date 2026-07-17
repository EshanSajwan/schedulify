package com.schedulify.TimeTable_generator.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardStats {

    private long teachers;
    private long subjects;
    private long rooms;
    private long classGroups;

}
