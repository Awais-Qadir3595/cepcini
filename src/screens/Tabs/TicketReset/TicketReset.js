import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from './style'
import Label from '../../../Components/core/Label'
import Bold from '../../../Components/core/bold'
import Row from '../../../Components/core/Row'
import DrawHorizentalLine from '../../../Components/core/drawHorizentalLine'
import { shouldUseActivityState } from 'react-native-screens'

export default function TicketReset() {
    return (
        <View style={styles.main}>
            <Bold label='AWS Machine Branch-2' style={styles.heading} size={18} color={'black'} />
            <Row style={styles.dateTime}>
                <Label label='02/05/2023' />
                <Label label='11:36:20 AM' />
            </Row>
            <Label label='Ticket Id # 12345678' style={styles.txt} />
            <Label label='Mr.John' style={styles.txt} />
            <DrawHorizentalLine borderStyle='dashed' style={styles.line}/>

            <Row style={styles.rwHead}>
                <Bold label='Qty'/>
                <Bold label='Name'/>
                <Bold label='Price'/>
            </Row>
            <Row style={styles.rowData}>
                <Label label='01' size={12}/>
                <Label label='Toasted Bagal Jam' size={12}/>
                <Label label='$1200' size={12}/>
            </Row>
            <Row style={styles.rowData}>
                <Label label='01' size={12}/>
                <Label label='Toasted Bagal Jam' size={12}/>
                <Label label='$1200' size={12}/>
            </Row>
            <Row style={styles.rowData}>
                <Label label='01' size={12}/>
                <Label label='Toasted Bagal Jam' size={12}/>
                <Label label='$1200' size={12}/>
            </Row>
<View style={styles.lowerView}>

<DrawHorizentalLine borderStyle='dashed' style={styles.line}/>
<Row style={styles.rowLower}>
    <Label label='Ticket type' size={13}/>
    <Bold label='Delivery' size={13}/>
</Row>

<Row style={styles.rowLower}>
    <Label label='Total Amount ' size={13}/>
    <Bold label='$2.34' size={13}/>
</Row>

<Row style={styles.rowLower}>
    <Label label='Remaining amount' size={13}/>
    <Bold label='$3.45' size={13}/>
</Row>

<Row style={styles.rowLower}>
    <Label label='Cash' size={13}/>
    <Bold label='$3.45' size={13}/>
</Row>

<DrawHorizentalLine borderStyle='dashed' style={styles.line} color='grey'/>

</View>



        </View>
    )
}
