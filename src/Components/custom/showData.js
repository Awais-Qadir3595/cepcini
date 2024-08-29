import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as SVG from '../../assets/svgs';
import Label from '../core/Label';
import Bold from '../core/bold';
export default function ShowData({ icon, label, count }) {

    const Icon = SVG[icon];

    return (
        <View style={styles.main}>
            {Icon ? <Icon /> : null}
            <Bold label={label} size={14} color={'black'} style={styles.label} />
            <Label label={count} size={16} />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        borderWidth: 1, padding: 20, borderRadius: 5, width: '48%', borderColor: '#DBDADE',
        marginVertical:10

    },
    label: {
        marginTop: 10
    }
})