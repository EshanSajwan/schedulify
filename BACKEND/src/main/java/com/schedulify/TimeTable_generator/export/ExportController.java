package com.schedulify.TimeTable_generator.export;

import com.itextpdf.text.DocumentException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("api/timetable/export")
@RequiredArgsConstructor
public class ExportController {

    private final ExcelExportService excelExportService;

    private final PdfExportService pdfExportService;

    @GetMapping("excel/{runId}")
    public ResponseEntity<byte[]> exportInExcel(@PathVariable("runId") Long runId) throws IOException {
        byte[] response = excelExportService.export(runId);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=timetable.xlsx"
                )
                .contentType(
                        MediaType.APPLICATION_OCTET_STREAM
                )
                .body(response);
    }

    @GetMapping("pdf/{runId}")
    public ResponseEntity<byte[]> exportInPdf(@PathVariable("runId") Long runId) throws IOException, DocumentException {

        byte[] response = pdfExportService.export(runId);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=timetable.pdf"
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(response);
    }
}
