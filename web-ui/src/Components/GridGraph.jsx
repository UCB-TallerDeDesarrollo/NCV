import {
    AnimatedAxis, // any of these can be non-animated equivalents
    AnimatedGrid,
    AnimatedLineSeries,
    XYChart,
    Tooltip,
  } from '@visx/xychart';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
  
const accessors = {
    xAccessor: d => d.x,
    yAccessor: d => d.y,
};
  
  const GridGraph = ({data,dataLabel=" "}) => (
    <Box sx={{padding:0}}>
        <Typography variant='h5'>Peso</Typography>
        <XYChart height={300} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
            <AnimatedAxis orientation="bottom" />
            <AnimatedAxis orientation="left" />
            <AnimatedGrid columns={false} numTicks={8} />
            <AnimatedLineSeries dataKey={dataLabel} data={data} {...accessors} />
            <Tooltip
                snapTooltipToDatumX
                snapTooltipToDatumY
                showVerticalCrosshair
                showSeriesGlyphs
                renderTooltip={({ tooltipData, colorScale }) => (
                <div>
                    <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
                    {tooltipData.nearestDatum.key}
                    </div>
                    {accessors.xAccessor(tooltipData.nearestDatum.datum)}
                    {', '}
                    {accessors.yAccessor(tooltipData.nearestDatum.datum)}
                </div>
                )}
            />
        </XYChart>
    </Box>
    
  );
  export default GridGraph;